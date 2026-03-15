import { Router } from "express";
import { invoicesController } from "../controllers/invoices.controller";

const router = Router();
router.get("/", invoicesController.list);
router.get("/:id", invoicesController.get);
router.post("/", invoicesController.create);
router.patch("/:id", invoicesController.update);
router.delete("/:id", invoicesController.remove);
router.post("/:id/mark-paid", invoicesController.markPaid);
export default router;
