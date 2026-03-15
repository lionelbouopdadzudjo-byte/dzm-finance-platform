import { store } from "../data/store";

export function computeMatchScore(invoice: any, payment: any) {
  let score = 0;
  if (invoice.business_unit_id !== payment.business_unit_id) return 0;
  if (invoice.total_amount === payment.amount) score += 40;
  else if (Math.abs(invoice.total_amount - payment.amount) <= invoice.total_amount * 0.05) score += 20;
  if (invoice.invoice_number && payment.reference && payment.reference.includes(invoice.invoice_number)) score += 20;
  const invDate = new Date(invoice.issue_date || invoice.created_at).getTime();
  const payDate = new Date(payment.payment_date || payment.created_at).getTime();
  const days = Math.abs(invDate - payDate) / 86400000;
  if (days <= 7) score += 20;
  if (payment.beneficiary_name?.toUpperCase().includes("AZIMUT")) score += 10;
  return score;
}

export function classifyMatch(score: number) {
  if (score >= 85) return "auto_confirmed";
  if (score >= 60) return "suggested";
  return "non_linked";
}

export function suggestMatchesByDocument(documentId: string) {
  const invoice = store.invoices.find(i => i.document_id === documentId);
  const payment = store.payments.find(p => p.document_id === documentId);
  const source = invoice ? "invoice" : payment ? "payment" : "none";
  if (source === "none") return [];
  if (source === "invoice") {
    return store.payments.map((p) => {
      const score = computeMatchScore(invoice, p);
      return { invoice_id: invoice.id, payment_id: p.id, score, status: classifyMatch(score) };
    }).filter(x => x.score >= 60);
  }
  return store.invoices.map((i) => {
    const score = computeMatchScore(i, payment);
    return { invoice_id: i.id, payment_id: payment.id, score, status: classifyMatch(score) };
  }).filter(x => x.score >= 60);
}
