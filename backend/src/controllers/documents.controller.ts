import crypto from "node:crypto";
import { Request, Response } from "express";
import { documentsRepository } from "../repositories/documents.repository";
import { reviewSchema } from "../validators/schemas";
import { ocrProcess } from "../services/ocr-client.service";
import { detectDocumentAnomalies } from "../services/anomaly.service";

export const documentsController = {
  async upload(req: Request, res: Response) {
    const file = (req as any).file;
    const hash = crypto.createHash("sha256").update(file?.buffer || Buffer.from(Date.now().toString())).digest("hex");
    const doc = {
      id: crypto.randomUUID(), owner_account_id: "owner-1", business_unit_id: req.body.businessUnitId || "bu-a", uploaded_by: "user-1", source: "web", doc_type: "unknown",
      original_filename: file?.originalname || "unknown", mime_type: file?.mimetype || "application/octet-stream", cloudinary_public_id: `mock/${crypto.randomUUID()}`,
      cloudinary_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg", thumbnail_url: null, file_hash: hash, perceptual_hash: hash.slice(0, 16), status: "processing", ocr_confidence: null, search_text: null, metadata_json: {}, created_at: new Date().toISOString()
    };
    const ocr = await ocrProcess(doc.cloudinary_url);
    doc.doc_type = ocr.document_type;
    doc.ocr_confidence = ocr.confidence;
    doc.status = ocr.needs_review ? "needs_review" : "processed";
    doc.search_text = JSON.stringify(ocr.fields || {});
    (doc as any).extraction = ocr;
    documentsRepository.create(doc);
    const anomalies = detectDocumentAnomalies(doc);
    res.status(201).json({ ...doc, anomalies });
  },
  list(_req: Request, res: Response) { res.json(documentsRepository.list()); },
  get(req: Request, res: Response) { res.json(documentsRepository.byId(req.params.id)); },
  async reprocess(req: Request, res: Response) {
    const doc = documentsRepository.byId(req.params.id);
    if (!doc) return res.status(404).json({ error: "document not found" });
    const ocr = await ocrProcess(doc.cloudinary_url);
    documentsRepository.update(doc.id, { status: ocr.needs_review ? "needs_review" : "processed", ocr_confidence: ocr.confidence, doc_type: ocr.document_type, extraction: ocr });
    res.json({ ok: true, id: req.params.id, ocr });
  },
  review(req: Request, res: Response) {
    const payload = reviewSchema.parse(req.body);
    const doc = documentsRepository.update(req.params.id, { status: payload.status, reviewed_note: payload.notes, reviewed_at: new Date().toISOString() });
    res.json(doc);
  }
};
