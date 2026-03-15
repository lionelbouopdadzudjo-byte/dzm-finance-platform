import { Request, Response } from "express";
import { store } from "../data/store";
import { suggestMatchesByDocument } from "../services/matching.service";

export const matchingController = {
  list(_req: Request, res: Response) { res.json(store.matches); },
  suggest(req: Request, res: Response) {
    const suggested = suggestMatchesByDocument(req.params.documentId);
    res.json({ suggested });
  },
  confirm(req: Request, res: Response) {
    res.json({ id: req.params.id, status: "confirmed" });
  },
  reject(req: Request, res: Response) {
    res.json({ id: req.params.id, status: "rejected" });
  }
};
