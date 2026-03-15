import { Request, Response } from "express";
import { store } from "../data/store";
import { detectIntent, answerBusinessQuery } from "../services/ai-assistant.service";

export const searchController = {
  query(req: Request, res: Response) {
    const q = String(req.query.q || "").toLowerCase();
    const includes = (obj: any) => JSON.stringify(obj).toLowerCase().includes(q);
    res.json({
      documents: store.documents.filter(includes),
      invoices: store.invoices.filter(includes),
      payments: store.payments.filter(includes)
    });
  },
  nl(req: Request, res: Response) {
    const text = String(req.body.query || "");
    const intent = detectIntent(text);
    const answer = intent === "business_query" ? answerBusinessQuery(text) : "Je peux répondre à des questions générales aussi.";
    res.json({ intent, answer, safe_filters: { owner_account_id: "owner-1" } });
  }
};
