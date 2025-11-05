import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getSales, addSale } from "../controllers/saleController.js";

const router = express.Router();

router.get("/", protect, getSales);
router.post("/", protect, addSale);

export default router;
