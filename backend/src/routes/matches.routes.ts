import { Router } from "express";
import { matchingController } from "../controllers/matching.controller";

const router = Router();
router.get("/", matchingController.list);
router.post("/suggest/:documentId", matchingController.suggest);
router.post("/:id/confirm", matchingController.confirm);
router.post("/:id/reject", matchingController.reject);
export default router;
