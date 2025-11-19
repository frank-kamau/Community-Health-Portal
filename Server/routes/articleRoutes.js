import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
} from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);

// Admin protected routes
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

export default router;
