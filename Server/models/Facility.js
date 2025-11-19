import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  type: { type: String, enum: ["Hospital", "Clinic", "Pharmacy"], default: "Clinic" },
  location: { lat: Number, lng: Number },
}, { timestamps: true });

export default mongoose.model("Facility", facilitySchema);
