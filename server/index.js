import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import route from "./Route/userroute.js";
import admin from "./Route/adminRoute.js";
import { authentication } from "./middleware/auth.js";
import adminCheck from "./middleware/admin.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Learnesta Backend is Live!");
});

app.use("/api", route);
app.use("/api/admin", authentication, adminCheck, admin);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});