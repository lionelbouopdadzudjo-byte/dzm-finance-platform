import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";

const router = Router();
router.get("/summary", dashboardController.summary);
router.get("/kpis", dashboardController.kpis);
router.get("/timeline", dashboardController.timeline);
router.get("/cashflow", dashboardController.cashflow);
router.get("/anomalies", dashboardController.anomalies);
export default router;
