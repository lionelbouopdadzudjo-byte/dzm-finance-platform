import { Router } from "express";
import { commentsController } from "../controllers/comments.controller";

const router = Router();
router.get("/", commentsController.list);
router.post("/", commentsController.create);
export default router;
