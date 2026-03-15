import crypto from "node:crypto";
import { Request, Response } from "express";
import { PDFDocument, StandardFonts } from "pdf-lib";
import ExcelJS from "exceljs";
import { store } from "../data/store";

export const reportsController = {
  async pdf(_req: Request, res: Response) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 842]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    page.drawText("DZM Finance Report", { x: 50, y: 790, size: 20, font });
    page.drawText(`Invoices: ${store.invoices.length}`, { x: 50, y: 760, size: 12, font });
    page.drawText(`Payments: ${store.payments.length}`, { x: 50, y: 740, size: 12, font });
    const bytes = await pdf.save();
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(bytes));
  },
  async excel(_req: Request, res: Response) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("invoices");
    ws.addRow(["invoice_number", "business_unit", "total_amount", "status"]);
    store.invoices.forEach((i) => ws.addRow([i.invoice_number, i.business_unit_id, i.total_amount, i.status]));
    const ws2 = wb.addWorksheet("payments");
    ws2.addRow(["reference", "business_unit", "amount", "status"]);
    store.payments.forEach((p) => ws2.addRow([p.reference, p.business_unit_id, p.amount, p.status]));
    const buff = await wb.xlsx.writeBuffer();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(Buffer.from(buff));
  },
  generate(_req: Request, res: Response) {
    res.json({ ok: true, report_id: crypto.randomUUID(), status: "queued" });
  }
};
