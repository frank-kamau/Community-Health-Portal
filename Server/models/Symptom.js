import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  symptoms: [String],
  severity: { type: String, enum: ["Mild", "Moderate", "Severe"], default: "Mild" },
  notes: String,
}, { timestamps: true });

export default mongoose.model("Symptom", symptomSchema);
