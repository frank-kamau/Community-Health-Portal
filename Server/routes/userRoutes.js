import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private
router.get("/me", protect, getProfile);

// Admin Route
router.get("/", protect, admin, getAllUsers);

export default router;
