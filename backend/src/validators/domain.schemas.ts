import { z } from "zod";

export const invoiceCreateSchema = z.object({
  business_unit_id: z.string().min(1),
  document_id: z.string().min(1),
  supplier_profile_id: z.string().min(1),
  invoice_number: z.string().min(1),
  issue_date: z.string().optional(),
  due_date: z.string().optional(),
  total_amount: z.number().positive(),
  extraction_json: z.record(z.any()).default({})
});

export const paymentCreateSchema = z.object({
  business_unit_id: z.string().min(1),
  document_id: z.string().min(1),
  supplier_profile_id: z.string().min(1),
  reference: z.string().optional(),
  beneficiary_name: z.string().optional(),
  provider: z.enum(["mtn", "orange", "bank", "cash", "other"]).optional(),
  payment_date: z.string().optional(),
  amount: z.number().positive(),
  extraction_json: z.record(z.any()).default({})
});
