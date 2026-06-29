import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMilkRecords, addMilkRecord, getDailyMilkSummary,  deleteMilkRecord } from "../controllers/milkController.js";

const router = express.Router();

router.get("/", protect, getMilkRecords);
router.post("/", protect, addMilkRecord);
router.delete("/:id", protect, deleteMilkRecord);
router.get("/summary/daily", protect, getDailyMilkSummary);

export default router;
