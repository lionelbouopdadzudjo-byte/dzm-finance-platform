import crypto from "node:crypto";
import { Request, Response } from "express";
import { paymentCreateSchema } from "../validators/domain.schemas";
import { paymentsRepository } from "../repositories/payments.repository";

export const paymentsController = {
  list(_req: Request, res: Response) { res.json(paymentsRepository.list()); },
  get(req: Request, res: Response) { res.json(paymentsRepository.byId(req.params.id)); },
  create(req: Request, res: Response) {
    const payload = paymentCreateSchema.parse(req.body);
    const payment = paymentsRepository.create({ id: crypto.randomUUID(), owner_account_id: "owner-1", currency: "XAF", status: "validated", created_at: new Date().toISOString(), ...payload });
    res.status(201).json(payment);
  },
  update(req: Request, res: Response) { res.json(paymentsRepository.update(req.params.id, req.body)); },
  remove(req: Request, res: Response) { res.json({ ok: paymentsRepository.remove(req.params.id) }); }
};
