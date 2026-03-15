import { Router } from "express";
import multer from "multer";
import { documentsController } from "../controllers/documents.controller";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post("/upload", upload.single("file"), documentsController.upload);
router.get("/", documentsController.list);
router.get("/:id", documentsController.get);
router.post("/:id/reprocess", documentsController.reprocess);
router.patch("/:id/review", documentsController.review);
export default router;
