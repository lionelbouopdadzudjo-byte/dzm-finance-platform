import { Request, Response } from "express";
import { store } from "../data/store";
import { documentsRepository } from "../repositories/documents.repository";
import { invoicesRepository } from "../repositories/invoices.repository";
import { paymentsRepository } from "../repositories/payments.repository";

function monthKey(input?: string) {
  const d = input ? new Date(input) : new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export const dashboardController = {
  summary(_req: Request, res: Response) {
    const invoices = invoicesRepository.list();
    const payments = paymentsRepository.list();
    const totalInvoiced = invoices.reduce((a, b) => a + Number(b.total_amount || 0), 0);
    const totalPaid = payments.reduce((a, b) => a + Number(b.amount || 0), 0);

    res.json({
      invoices: invoices.length,
      payments: payments.length,
      anomalies: store.anomalies.length,
      totalInvoiced,
      totalPaid,
      outstanding: totalInvoiced - totalPaid
    });
  },
  kpis(_req: Request, res: Response) {
    const invoices = invoicesRepository.list();
    const payments = paymentsRepository.list();
    const documents = documentsRepository.list();

    res.json({
      overdueInvoices: invoices.filter((i) => i.status === "overdue").length,
      unmatchedPayments: payments.filter((p) => ["unmatched", "needs_review"].includes(p.status)).length,
      needsReviewDocuments: documents.filter((d) => d.status === "needs_review").length
    });
  },
  timeline(_req: Request, res: Response) {
    const documents = documentsRepository.list();
    const invoices = invoicesRepository.list();
    const payments = paymentsRepository.list();

    const timeline = [...documents, ...invoices, ...payments, ...store.anomalies]
      .sort((a: any, b: any) => new Date(b.created_at || b.payment_date || 0).getTime() - new Date(a.created_at || a.payment_date || 0).getTime())
      .slice(0, 30);
    res.json(timeline);
  },
  cashflow(_req: Request, res: Response) {
    const invoices = invoicesRepository.list();
    const payments = paymentsRepository.list();
    const bucket = new Map<string, { month: string; inflow: number; outflow: number }>();

    for (const invoice of invoices) {
      const key = monthKey(invoice.issue_date || invoice.created_at);
      const b = bucket.get(key) || { month: key, inflow: 0, outflow: 0 };
      b.outflow += Number(invoice.total_amount || 0);
      bucket.set(key, b);
    }

    for (const payment of payments) {
      const key = monthKey(payment.payment_date || payment.created_at);
      const b = bucket.get(key) || { month: key, inflow: 0, outflow: 0 };
      b.inflow += Number(payment.amount || 0);
      bucket.set(key, b);
    }

    const rows = Array.from(bucket.values()).sort((a, b) => a.month.localeCompare(b.month));
    res.json(rows);
  },
  anomalies(_req: Request, res: Response) { res.json(store.anomalies); }
};
