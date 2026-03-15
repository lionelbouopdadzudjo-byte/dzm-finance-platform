import { Request, Response } from "express";
import { detectIntent, answerBusinessQuery } from "../services/ai-assistant.service";

export const aiController = {
  assistant(req: Request, res: Response) {
    const message = String(req.body.message || "");
    const intent = detectIntent(message);
    const answer = intent === "business_query" ? answerBusinessQuery(message) : "Je suis votre assistant général, prêt à aider.";
    res.json({ intent, answer });
  },
  forecast(_req: Request, res: Response) {
    res.json({
      horizon_days: 30,
      cashflow_projection: [
        { day: 7, balance: 550000 },
        { day: 14, balance: 470000 },
        { day: 30, balance: 680000 }
      ]
    });
  },
  stt(_req: Request, res: Response) { res.json({ text: "transcription mock" }); },
  tts(_req: Request, res: Response) { res.json({ audioUrl: "https://example.com/audio.mp3" }); }
};
