import { store } from "../data/store";
const now = new Date().toISOString();
store.documents.push(
  { id:"doc-1", owner_account_id:"owner-1", business_unit_id:"bu-a", uploaded_by:"user-1", source:"web", doc_type:"invoice", original_filename:"inv1.jpg", mime_type:"image/jpeg", cloudinary_public_id:"sample1", cloudinary_url:"https://res.cloudinary.com/demo/image/upload/sample.jpg", status:"processed", ocr_confidence:0.95, created_at:now },
  { id:"doc-2", owner_account_id:"owner-1", business_unit_id:"bu-b", uploaded_by:"user-1", source:"telegram", doc_type:"payment_proof", original_filename:"pay1.jpg", mime_type:"image/jpeg", cloudinary_public_id:"sample2", cloudinary_url:"https://res.cloudinary.com/demo/image/upload/sample.jpg", status:"needs_review", ocr_confidence:0.51, created_at:now }
);
store.invoices.push(
  { id:"inv-1", owner_account_id:"owner-1", business_unit_id:"bu-a", document_id:"doc-1", supplier_profile_id:"sup-1", invoice_number:"INV-2025-001", issue_date:"2025-03-01", due_date:"2025-03-08", currency:"XAF", total_amount:200000, paid_amount:200000, balance_due:0, status:"paid", extraction_json:{}, created_at:now },
  { id:"inv-2", owner_account_id:"owner-1", business_unit_id:"bu-b", document_id:"doc-x", supplier_profile_id:"sup-1", invoice_number:"INV-2025-002", issue_date:"2025-03-03", due_date:"2025-03-10", currency:"XAF", total_amount:300000, paid_amount:0, balance_due:300000, status:"overdue", extraction_json:{}, created_at:now }
);
store.payments.push(
  { id:"pay-1", owner_account_id:"owner-1", business_unit_id:"bu-a", document_id:"doc-2", supplier_profile_id:"sup-1", reference:"INV-2025-001", beneficiary_name:"DT AZIMUT", provider:"mtn", payment_date:now, amount:200000, currency:"XAF", status:"matched", extraction_json:{}, created_at:now },
  { id:"pay-2", owner_account_id:"owner-1", business_unit_id:"bu-b", document_id:"doc-y", supplier_profile_id:"sup-1", reference:"SANS_REF", beneficiary_name:"DT AZIMUT", provider:"bank", payment_date:now, amount:120000, currency:"XAF", status:"unmatched", extraction_json:{}, created_at:now }
);
store.anomalies.push({ id:"anom-1", owner_account_id:"owner-1", business_unit_id:"bu-b", related_type:"invoice", related_id:"inv-2", severity:"high", code:"INVOICE_OVERDUE", message:"Facture INV-2025-002 en retard", status:"open", created_at:now });
store.alerts.push({ id:"alert-2", owner_account_id:"owner-1", business_unit_id:"bu-b", type:"critical", title:"Low OCR", message:"Document doc-2 needs review", channel:"telegram", status:"pending", created_at:now });
console.log("Seed in-memory loaded", { docs: store.documents.length, invoices: store.invoices.length, payments: store.payments.length });
