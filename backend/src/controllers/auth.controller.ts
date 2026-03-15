import crypto from "node:crypto";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/schemas";
import { store } from "../data/store";

export const authController = {
  register(req: Request, res: Response) {
    const payload = registerSchema.parse(req.body);
    const user = { id: crypto.randomUUID(), owner_account_id: "owner-1", email: payload.email, full_name: payload.fullName, role: payload.role };
    store.profiles.push(user);
    res.status(201).json(user);
  },
  login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const user = store.profiles.find((u) => u.email === payload.email) || store.profiles[0];
    const token = jwt.sign({ sub: user.id, role: user.role, owner_account_id: user.owner_account_id }, process.env.JWT_SECRET || "change-me", { expiresIn: "1d" });
    res.json({ token, user });
  },
  logout(_req: Request, res: Response) { res.json({ ok: true }); },
  me(req: Request, res: Response) { res.json((req as any).user); }
};
