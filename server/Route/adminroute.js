import { Router } from "express";
import Course_tb from "../models/courseModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Material from "../models/materialModel.js";

const admin = Router();

// ─── ADD COURSE ───────────────────────────────────────────────
// Frontend sends: CourseName, CourseId, CourseType, Description, Price
admin.post("/addCourse", async (req, res) => {
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    if (!CourseName || !Description) {
      return res.status(400).json({ msg: "Course name and description are required" });
    }

    const exists = await Course_tb.findOne({ CourseTitle: CourseName });
    if (exists) {
      return res.status(400).json({ msg: "Course already exists" });
    }

    const course = new Course_tb({
      CourseTitle: CourseName,
      CourseId: CourseId || "",
      CourseType: CourseType || "Self-Paced",
      Description,
      Price: Price || 0,
      Duration: CourseType || "Self-Paced",
    });

    await course.save();
    res.status(201).json({ msg: "Course added successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// ─── UPDATE COURSE (PUT) ──────────────────────────────────────
admin.put("/updatecourse/:id", async (req, res) => {
  try {
    const updated = await Course_tb.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Course updated", updated });
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});

// ─── UPDATE COURSE (PATCH) ────────────────────────────────────
admin.patch("/updatecourse/:id", async (req, res) => {
  try {
    const updated = await Course_tb.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Course updated", updated });
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});

// ─── DELETE COURSE ────────────────────────────────────────────
admin.delete("/deletecourse/:id", async (req, res) => {
  try {
    const deleted = await Course_tb.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Course deleted successfully" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
});

// ─── GET COURSE BY ID ─────────────────────────────────────────
admin.get("/course/:id", async (req, res) => {
  try {
    const course = await Course_tb.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    res.json({ course });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET ALL COURSES ──────────────────────────────────────────
admin.get("/courses", async (req, res) => {
  try {
    const courses = await Course_tb.find();
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET ALL USERS OF A COURSE ────────────────────────────────
admin.get("/course-users/:courseId", async (req, res) => {
  try {
    const users = await User.find({ EnrolledCourses: req.params.courseId });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── ADD TASK ─────────────────────────────────────────────────
admin.post("/add-task", async (req, res) => {
  try {
    const { TaskTitle, Description, DueDate, CourseId } = req.body;

    if (!TaskTitle || !Description || !DueDate || !CourseId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const task = new Task({ TaskTitle, Description, DueDate, Course: CourseId });
    await task.save();

    res.status(201).json({ msg: "Task added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── UPDATE TASK ──────────────────────────────────────────────
admin.put("/update-task/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task updated", updated });
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});

// ─── DELETE TASK ──────────────────────────────────────────────
admin.delete("/delete-task/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task deleted successfully" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
});

// ─── GET ALL TASKS ────────────────────────────────────────────
admin.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch tasks", error: err.message });
  }
});

// ─── MARK STUDENT AS PAID ─────────────────────────────────────
admin.patch("/mark-paid/:userName", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { UserName: req.params.userName },
      { IsPaid: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: `${req.params.userName} is now a paid member` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── ADD STUDY MATERIAL ───────────────────────────────────────
admin.post("/add-material", async (req, res) => {
  try {
    const { Title, Content, CourseId } = req.body;
    if (!Title || !Content || !CourseId) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const material = new Material({ Title, Content, Course: CourseId });
    await material.save();
    res.status(201).json({ msg: "Study material added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── GET MATERIALS BY COURSE ──────────────────────────────────
admin.get("/materials/:courseId", async (req, res) => {
  try {
    const materials = await Material.find({ Course: req.params.courseId });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ─── DELETE MATERIAL ──────────────────────────────────────────
admin.delete("/delete-material/:id", async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ msg: "Material deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default admin;
