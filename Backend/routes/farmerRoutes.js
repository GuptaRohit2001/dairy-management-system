// import express from "express";
// import protect from "../middleware/authMiddleware.js";
// import { getFarmers, addFarmer, updateFarmer, deleteFarmer } from "../controllers/farmerController.js";

// const router = express.Router();

// router.get("/", protect, getFarmers);
// router.post("/", protect, addFarmer);
// router.put("/:id", protect, updateFarmer);
// router.delete("/:id", protect, deleteFarmer);

// export default router;



import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getFarmers, addFarmer, updateFarmer, deleteFarmer } from "../controllers/farmerController.js";

const router = express.Router();

router.get("/", protect, getFarmers);
router.post("/", protect, addFarmer);
router.put("/:id", protect, updateFarmer);
router.delete("/:id", protect, deleteFarmer);

export default router;
