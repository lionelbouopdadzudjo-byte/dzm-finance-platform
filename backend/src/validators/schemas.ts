import { z } from "zod";

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
export const registerSchema = z.object({ fullName: z.string().min(2), email: z.string().email(), password: z.string().min(8), role: z.enum(["owner","admin","manager","accountant","viewer"]).default("owner") });
export const reviewSchema = z.object({ status: z.enum(["processed","needs_review","error"]), notes: z.string().optional() });
