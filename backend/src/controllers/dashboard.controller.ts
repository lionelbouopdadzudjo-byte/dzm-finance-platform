import { Request, Response } from "express";
import { store } from "../data/store";

export const dashboardController = {
  summary(_req: Request, res: Response) {
    const totalInvoiced = store.invoices.reduce((a, b) => a + Number(b.total_amount || 0), 0);
    const totalPaid = store.payments.reduce((a, b) => a + Number(b.amount || 0), 0);
    res.json({
      invoices: store.invoices.length,
      payments: store.payments.length,
      anomalies: store.anomalies.length,
      totalInvoiced,
      totalPaid,
      outstanding: totalInvoiced - totalPaid
    });
  },
  kpis(_req: Request, res: Response) {
    res.json({
      overdueInvoices: store.invoices.filter((i) => i.status === "overdue").length,
      unmatchedPayments: store.payments.filter((p) => ["unmatched", "needs_review"].includes(p.status)).length,
      needsReviewDocuments: store.documents.filter((d) => d.status === "needs_review").length
    });
  },
  timeline(_req: Request, res: Response) {
    const timeline = [...store.documents, ...store.invoices, ...store.payments, ...store.anomalies]
      .sort((a: any, b: any) => new Date(b.created_at || b.payment_date || 0).getTime() - new Date(a.created_at || a.payment_date || 0).getTime())
      .slice(0, 30);
    res.json(timeline);
  },
  cashflow(_req: Request, res: Response) {
    res.json([
      { month: "Jan", inflow: 1500000, outflow: 1000000 },
      { month: "Feb", inflow: 1800000, outflow: 1200000 },
      { month: "Mar", inflow: 1300000, outflow: 1100000 }
    ]);
  },
  anomalies(_req: Request, res: Response) { res.json(store.anomalies); }
};
