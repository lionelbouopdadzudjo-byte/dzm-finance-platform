import crypto from "node:crypto";
import { Request, Response } from "express";
import { invoicesRepository } from "../repositories/invoices.repository";
import { invoiceCreateSchema } from "../validators/domain.schemas";
import { detectInvoiceAnomalies } from "../services/anomaly.service";

export const invoicesController = {
  list(_req: Request, res: Response) { res.json(invoicesRepository.list()); },
  get(req: Request, res: Response) { res.json(invoicesRepository.byId(req.params.id)); },
  create(req: Request, res: Response) {
    const payload = invoiceCreateSchema.parse(req.body);
    const invoice = invoicesRepository.create({ id: crypto.randomUUID(), owner_account_id: "owner-1", currency: "XAF", paid_amount: 0, balance_due: payload.total_amount, status: "validated", created_at: new Date().toISOString(), ...payload });
    const anomalies = detectInvoiceAnomalies(invoice);
    res.status(201).json({ invoice, anomalies });
  },
  update(req: Request, res: Response) { res.json(invoicesRepository.update(req.params.id, req.body)); },
  remove(req: Request, res: Response) { res.json({ ok: invoicesRepository.remove(req.params.id) }); },
  markPaid(req: Request, res: Response) {
    const inv = invoicesRepository.byId(req.params.id);
    if (!inv) return res.status(404).json({ error: "invoice not found" });
    res.json(invoicesRepository.update(req.params.id, { status: "paid", paid_amount: inv.total_amount, balance_due: 0 }));
  }
};
