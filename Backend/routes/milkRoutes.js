import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMilkRecords, addMilkRecord } from "../controllers/milkController.js";

const router = express.Router();

router.get("/", protect, getMilkRecords);
router.post("/", protect, addMilkRecord);

export default router;
