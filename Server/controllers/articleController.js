import Article from "../models/Article.js";

// @desc Get all articles
// @route GET /api/articles
// @access Public
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

// @desc Get single article
// @route GET /api/articles/:id
// @access Public
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving article" });
  }
};

// @desc Create new article
// @route POST /api/articles
// @access Private/Admin
export const createArticle = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { title, content, category, image } = req.body;
  try {
    const newArticle = await Article.create({
      title,
      content,
      category,
      image,
      createdBy: req.user._id,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Failed to create article" });
  }
};

// @desc Update article
// @route PUT /api/articles/:id
// @access Private/Admin
export const updateArticle = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to update article" });
  }
};

// @desc Delete article
// @route DELETE /api/articles/:id
// @access Private/Admin
export const deleteArticle = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete article" });
  }
};
