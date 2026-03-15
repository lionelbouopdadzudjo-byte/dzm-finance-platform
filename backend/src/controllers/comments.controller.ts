import crypto from "node:crypto";
import { Request, Response } from "express";
import { store } from "../data/store";

export const commentsController = {
  list(req: Request, res: Response) {
    const { entityType, entityId } = req.query;
    res.json(store.comments.filter((c) => c.entity_type === entityType && c.entity_id === entityId));
  },
  create(req: Request, res: Response) {
    const c = { id: crypto.randomUUID(), owner_account_id: "owner-1", author_id: "user-1", created_at: new Date().toISOString(), ...req.body };
    store.comments.push(c);
    res.status(201).json(c);
  }
};
