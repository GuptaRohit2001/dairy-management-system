import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getSales, addSale, getDailySalesSummary } from "../controllers/salesController.js";

const router = express.Router();

router.get("/", protect, getSales);
router.post("/", protect, addSale);

// ✅ New route for daily sales summary
router.get("/summary/daily", protect, getDailySalesSummary);

export default router;
