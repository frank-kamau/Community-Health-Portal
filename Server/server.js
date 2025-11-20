import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminSetupRoute from "./routes/adminSetup.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/setup", adminSetupRoute);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
