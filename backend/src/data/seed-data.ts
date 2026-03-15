import { store } from "./store";

let seeded = false;

export function seedInMemoryData(force = false) {
  if (seeded && !force) {
    return { docs: store.documents.length, invoices: store.invoices.length, payments: store.payments.length, skipped: true };
  }

  store.documents.length = 0;
  store.invoices.length = 0;
  store.payments.length = 0;
  store.matches.length = 0;
  store.anomalies.length = 0;
  store.comments.length = 0;

  const now = new Date().toISOString();

  store.documents.push(
    { id: "doc-1", owner_account_id: "owner-1", business_unit_id: "bu-a", uploaded_by: "user-1", source: "web", doc_type: "invoice", original_filename: "inv1.jpg", mime_type: "image/jpeg", cloudinary_public_id: "sample1", cloudinary_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg", status: "processed", ocr_confidence: 0.95, created_at: now },
    { id: "doc-2", owner_account_id: "owner-1", business_unit_id: "bu-b", uploaded_by: "user-1", source: "telegram", doc_type: "payment_proof", original_filename: "pay1.jpg", mime_type: "image/jpeg", cloudinary_public_id: "sample2", cloudinary_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg", status: "needs_review", ocr_confidence: 0.51, created_at: now },
    { id: "doc-3", owner_account_id: "owner-1", business_unit_id: "bu-a", uploaded_by: "user-1", source: "api", doc_type: "invoice", original_filename: "inv2.jpg", mime_type: "image/jpeg", cloudinary_public_id: "sample3", cloudinary_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg", status: "processed", ocr_confidence: 0.93, created_at: now }
  );

  store.invoices.push(
    { id: "inv-1", owner_account_id: "owner-1", business_unit_id: "bu-a", document_id: "doc-1", supplier_profile_id: "sup-1", invoice_number: "INV-2025-001", issue_date: "2025-03-01", due_date: "2025-03-08", currency: "XAF", total_amount: 200000, paid_amount: 200000, balance_due: 0, status: "paid", extraction_json: {}, created_at: now },
    { id: "inv-2", owner_account_id: "owner-1", business_unit_id: "bu-b", document_id: "doc-2", supplier_profile_id: "sup-1", invoice_number: "INV-2025-002", issue_date: "2025-03-03", due_date: "2025-03-10", currency: "XAF", total_amount: 300000, paid_amount: 0, balance_due: 300000, status: "overdue", extraction_json: {}, created_at: now },
    { id: "inv-3", owner_account_id: "owner-1", business_unit_id: "bu-a", document_id: "doc-3", supplier_profile_id: "sup-1", invoice_number: "INV-2025-003", issue_date: "2025-03-05", due_date: "2025-03-15", currency: "XAF", total_amount: 450000, paid_amount: 200000, balance_due: 250000, status: "partially_paid", extraction_json: {}, created_at: now }
  );

  store.payments.push(
    { id: "pay-1", owner_account_id: "owner-1", business_unit_id: "bu-a", document_id: "doc-1", supplier_profile_id: "sup-1", reference: "INV-2025-001", beneficiary_name: "DT AZIMUT", provider: "mtn", payment_date: now, amount: 200000, currency: "XAF", status: "matched", extraction_json: {}, created_at: now },
    { id: "pay-2", owner_account_id: "owner-1", business_unit_id: "bu-b", document_id: "doc-2", supplier_profile_id: "sup-1", reference: "SANS_REF", beneficiary_name: "DT AZIMUT", provider: "bank", payment_date: now, amount: 120000, currency: "XAF", status: "unmatched", extraction_json: {}, created_at: now },
    { id: "pay-3", owner_account_id: "owner-1", business_unit_id: "bu-a", document_id: "doc-3", supplier_profile_id: "sup-1", reference: "INV-2025-003", beneficiary_name: "DT AZIMUT", provider: "orange", payment_date: now, amount: 200000, currency: "XAF", status: "partially_allocated", extraction_json: {}, created_at: now }
  );

  store.matches.push(
    { id: "match-1", owner_account_id: "owner-1", business_unit_id: "bu-a", invoice_id: "inv-1", payment_id: "pay-1", match_score: 95, match_reason: { exact_amount: true }, allocation_amount: 200000, status: "auto_confirmed", created_at: now },
    { id: "match-2", owner_account_id: "owner-1", business_unit_id: "bu-a", invoice_id: "inv-3", payment_id: "pay-3", match_score: 72, match_reason: { close_amount: true }, allocation_amount: 200000, status: "partial_allocation", created_at: now }
  );

  store.anomalies.push(
    { id: "anom-1", owner_account_id: "owner-1", business_unit_id: "bu-b", related_type: "invoice", related_id: "inv-2", severity: "high", code: "INVOICE_OVERDUE", message: "Facture INV-2025-002 en retard", status: "open", created_at: now },
    { id: "anom-2", owner_account_id: "owner-1", business_unit_id: "bu-b", related_type: "payment", related_id: "pay-2", severity: "medium", code: "PAYMENT_WITHOUT_INVOICE", message: "Paiement sans facture claire", status: "open", created_at: now }
  );

  const hasAlert2 = store.alerts.some((a: any) => a.id === "alert-2");
  if (!hasAlert2) {
    store.alerts.push({ id: "alert-2", owner_account_id: "owner-1", business_unit_id: "bu-b", type: "critical", title: "Low OCR", message: "Document doc-2 needs review", channel: "telegram", status: "pending", created_at: now });
  }

  seeded = true;
  return { docs: store.documents.length, invoices: store.invoices.length, payments: store.payments.length, skipped: false };
}

export function ensureInMemorySeeded() {
  if (!seeded || store.invoices.length === 0 || store.payments.length === 0) {
    return seedInMemoryData(false);
  }
  return { docs: store.documents.length, invoices: store.invoices.length, payments: store.payments.length, skipped: true };
}
