import { Router } from "express";
import { paymentsController } from "../controllers/payments.controller";

const router = Router();
router.get("/", paymentsController.list);
router.get("/:id", paymentsController.get);
router.post("/", paymentsController.create);
router.patch("/:id", paymentsController.update);
router.delete("/:id", paymentsController.remove);
export default router;
