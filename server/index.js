import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import route from "./Route/userroute.js";
import admin from "./Route/adminroute.js";
import { authentication } from "./middleware/auth.js";
import adminCheck from "./middleware/admin.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI;

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser()); // Parses cookies automatically

// Allow requests from the React dev server (Vite runs on 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
  })
);

// ─── MongoDB Connection ───────────────────────────────────────
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ─── Routes ──────────────────────────────────────────────────
app.use("/api", route);                                      // /api/signup, /api/login, /api/courses ...
app.use("/api/admin", authentication, adminCheck, admin);   // /api/admin/addcourse ...

// ─── Start Server ─────────────────────────────────────────────
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
