import express from "express";
import {
  getFacilities,
  addFacility,
  getFacilityById,
  deleteFacility,
  updateFacility,
} from "../controllers/facilityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFacilities);
router.get("/:id", getFacilityById);

// Admin-only
router.post("/", protect, addFacility);
router.put("/:id", protect, updateFacility);
router.delete("/:id", protect, deleteFacility);

export default router;
