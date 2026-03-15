import { Request, Response } from "express";
import { detectIntent, answerBusinessQuery } from "../services/ai-assistant.service";

export const telegramController = {
  webhook(req: Request, res: Response) {
    const incomingText = req.body?.message?.text || req.body?.message?.caption || "";
    const intent = detectIntent(incomingText);
    const reply = intent === "business_query" ? answerBusinessQuery(incomingText) : "Message Telegram reçu ✅";
    res.json({ ok: true, intent, reply });
  }
};
