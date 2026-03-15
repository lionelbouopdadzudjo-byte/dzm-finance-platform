import { z } from "zod";

export const BusinessUnitSchema = z.enum(["DZM A", "DZM B"]);
export const InvoiceStatusSchema = z.enum(["draft","validated","partially_paid","paid","overdue","cancelled","needs_review"]);
export const PaymentStatusSchema = z.enum(["detected","validated","matched","unmatched","needs_review","partially_allocated","allocated"]);

export type BusinessUnit = z.infer<typeof BusinessUnitSchema>;
