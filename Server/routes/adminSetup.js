// /routes/adminSetup.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/create-admin", async (req, res) => {
  try {
    const hashed = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashed,
      role: "admin"
    });

    res.json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
