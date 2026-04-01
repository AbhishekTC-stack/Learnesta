import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Course_tb from "../models/courseModel.js";
import Task from "../models/taskModel.js";
import Material from "../models/materialModel.js";
import { authentication } from "../middleware/auth.js";

const route = Router();

// ─── SIGNUP ────────────────────────────
route.post("/signup", async (req, res) => {
  try {
    const { FirstName, LastName, UserName, Password, UserRole } = req.body;

    if (!FirstName || !UserName || !Password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const exist = await User.findOne({ UserName });
    if (exist) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = new User({
      FirstName,
      LastName: LastName || "",
      UserName,
      Password: hashedPassword,
      UserRole: UserRole || "student",
    });

    await user.save();
    res.status(201).json({ msg: "Signup Successful" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── LOGIN ────────────────────────────────────────────────────
route.post("/login", async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
      return res.status(400).json({ msg: "Username and Password required" });
    }

    const user = await User.findOne({ UserName });
    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const valid = await bcrypt.compare(Password, user.Password);
    if (!valid) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    const token = jwt.sign(
      { UserName: user.UserName, UserRole: user.UserRole },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "Login Successful",
      user: {
        username: user.UserName,
        firstName: user.FirstName,
        lastName: user.LastName,
        userRole: user.UserRole,
      },
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── LOGOUT ──────────────────────────────────────────
route.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({ msg: "Logged out successfully" });
});

// ─── GET PROFILE ──────────────────────────────────────────────
route.get("/profile", authentication, async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.name }).select("-Password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({
      username: user.UserName,
      firstName: user.FirstName,
      lastName: user.LastName,
      userRole: user.UserRole,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── TRIAL STATUS ─────────────────────────────────────────────
route.get("/trial-status", authentication, async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.name });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const daysUsed = Math.floor(
      (Date.now() - new Date(user.TrialStartDate)) / (1000 * 60 * 60 * 24)
    );

    const daysLeft = Math.max(0, 30 - daysUsed);
    const trialExpired = daysLeft === 0 && !user.IsPaid;

    res.json({
      daysLeft,
      trialExpired,
      isPaid: user.IsPaid,
      trialStartDate: user.TrialStartDate,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET ALL COURSES ──────────────────────────────────
route.get("/getAllCourses", async (req, res) => {
  try {
    const courses = await Course_tb.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── ENROLL COURSE ─────────────────────────────────────
route.post("/enroll/:courseId", authentication, async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.name });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ Convert to string for comparison
    const alreadyEnrolled = user.EnrolledCourses.map(id => id.toString()).includes(req.params.courseId);

    if (alreadyEnrolled) {
      return res.status(400).json({ msg: "Already enrolled" });
    }

    user.EnrolledCourses.push(req.params.courseId);
    await user.save();

    res.json({ msg: "Enrolled successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET MY ENROLLED COURSES ──────────────────────────────────
route.get("/class", authentication, async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.name }).populate("EnrolledCourses");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ enrolledCourses: user.EnrolledCourses });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET MATERIALS ────────────────────────────────────────────
// ✅ FIXED: Convert ObjectIds to strings before comparison
route.get("/materials/:courseId", authentication, async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.name });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ Convert each enrolled course ID to string before comparing
    const enrolledIds = user.EnrolledCourses.map(id => id.toString());
    const isEnrolled = enrolledIds.includes(req.params.courseId);

    if (!isEnrolled) {
      return res.status(403).json({ msg: "Not enrolled in this course" });
    }

    const materials = await Material.find({ Course: req.params.courseId });
    res.json(materials);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET TASKS ────────────────────────────────────────────────
// ✅ FIXED: Convert ObjectIds to strings before comparison
route.get("/tasks/:courseId", authentication, async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.name });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ Convert each enrolled course ID to string before comparing
    const enrolledIds = user.EnrolledCourses.map(id => id.toString());
    const isEnrolled = enrolledIds.includes(req.params.courseId);

    if (!isEnrolled) {
      return res.status(403).json({ msg: "Not enrolled in this course" });
    }

    const tasks = await Task.find({ Course: req.params.courseId });
    res.json({ tasks });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default route;
