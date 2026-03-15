import { Router } from "express";
import { alertsController } from "../controllers/alerts.controller";

const router = Router();
router.get("/", alertsController.list);
router.post("/:id/read", alertsController.read);
export default router;
