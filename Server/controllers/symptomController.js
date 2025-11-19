import Symptom from "../models/Symptom.js";

// @desc Add new symptom entry
// @route POST /api/symptoms
// @access Private
export const addSymptom = async (req, res) => {
  const { symptoms, severity, notes } = req.body;
  try {
    const newSymptom = await Symptom.create({
      userId: req.user._id,
      symptoms,
      severity,
      notes,
    });
    res.status(201).json(newSymptom);
  } catch (error) {
    res.status(500).json({ message: "Failed to add symptom", error: error.message });
  }
};

// @desc Get current user’s symptoms
// @route GET /api/symptoms/my
// @access Private
export const getUserSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user symptoms" });
  }
};

// @desc Get all symptoms (Admin only)
// @route GET /api/symptoms
// @access Private/Admin
export const getAllSymptoms = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const allSymptoms = await Symptom.find().populate("userId", "name email");
    res.json(allSymptoms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch symptoms" });
  }
};
