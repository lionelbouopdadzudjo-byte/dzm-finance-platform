import crypto from "node:crypto";
import { store } from "../data/store";

const HIGH_AMOUNT_THRESHOLD = 1_000_000;

export function raiseAnomaly(payload: any) {
  const anomaly = { id: crypto.randomUUID(), created_at: new Date().toISOString(), status: "open", ...payload };
  store.anomalies.push(anomaly);
  return anomaly;
}

export function detectInvoiceAnomalies(invoice: any) {
  if (!invoice) return [];
  const out: any[] = [];
  const duplicate = store.invoices.find((x) => x.id !== invoice.id && x.invoice_number === invoice.invoice_number && x.business_unit_id === invoice.business_unit_id);
  if (duplicate) out.push(raiseAnomaly({ owner_account_id: invoice.owner_account_id, business_unit_id: invoice.business_unit_id, related_type: "invoice", related_id: invoice.id, severity: "high", code: "DUPLICATE_INVOICE", message: `Duplicate invoice number ${invoice.invoice_number}` }));
  if (Number(invoice.total_amount || 0) > HIGH_AMOUNT_THRESHOLD) out.push(raiseAnomaly({ owner_account_id: invoice.owner_account_id, business_unit_id: invoice.business_unit_id, related_type: "invoice", related_id: invoice.id, severity: "medium", code: "UNUSUAL_HIGH_AMOUNT", message: `Invoice amount unusually high (${invoice.total_amount})` }));
  return out;
}

export function detectDocumentAnomalies(document: any) {
  const out: any[] = [];
  if (!document) return out;
  if (document.ocr_confidence !== null && document.ocr_confidence < 0.75) out.push(raiseAnomaly({ owner_account_id: document.owner_account_id, business_unit_id: document.business_unit_id, related_type: "document", related_id: document.id, severity: "medium", code: "LOW_OCR_CONFIDENCE", message: "OCR confidence is below review threshold." }));
  const hashDup = document.file_hash && store.documents.find((d) => d.id !== document.id && d.file_hash && d.file_hash === document.file_hash);
  if (hashDup) out.push(raiseAnomaly({ owner_account_id: document.owner_account_id, business_unit_id: document.business_unit_id, related_type: "document", related_id: document.id, severity: "high", code: "DUPLICATE_DOCUMENT", message: "File hash duplicate detected." }));
  return out;
}
