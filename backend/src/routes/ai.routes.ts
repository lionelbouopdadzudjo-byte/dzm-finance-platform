import { Router } from "express";
import { aiController } from "../controllers/ai.controller";

const router = Router();
router.post("/voice/stt", aiController.stt);
router.post("/voice/tts", aiController.tts);
router.post("/ai/assistant", aiController.assistant);
router.post("/ai/forecast", aiController.forecast);
export default router;
