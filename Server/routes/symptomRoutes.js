import express from "express";
import {
  addSymptom,
  getUserSymptoms,
  getAllSymptoms,
} from "../controllers/symptomController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, addSymptom);
router.get("/my", protect, getUserSymptoms);

// Admin route (optional)
router.get("/", protect, getAllSymptoms);

export default router;
