import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMilkRecords, addMilkRecord, getDailyMilkSummary } from "../controllers/milkController.js";

const router = express.Router();

router.get("/", protect, getMilkRecords);
router.post("/", protect, addMilkRecord);

// ✅ New route for daily milk summary
router.get("/summary/daily", protect, getDailyMilkSummary);

export default router;
