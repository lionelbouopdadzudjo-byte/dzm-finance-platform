import { Router } from "express";
import { reportsController } from "../controllers/reports.controller";

const router = Router();
router.get("/pdf", reportsController.pdf);
router.get("/excel", reportsController.excel);
router.post("/generate", reportsController.generate);
export default router;
