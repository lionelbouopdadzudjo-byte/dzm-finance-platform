import { Router } from "express";
import { searchController } from "../controllers/search.controller";

const router = Router();
router.get("/", searchController.query);
router.post("/natural-language", searchController.nl);
export default router;
