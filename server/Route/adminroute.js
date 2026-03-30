import { Router } from "express";
import Course_tb from "../models/courseModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Material from "../models/materialModel.js";

const admin = Router();

admin.post("/addCourse", async (req, res) => {
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    if (!CourseName || !Description) {
      return res.status(400).json({ msg: "Course name and description required" });
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
    res.status(201).json({ msg: "Course added" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.patch("/updatecourse/:id", async (req, res) => {
  try {
    const updated = await Course_tb.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Updated", updated });

  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});

admin.delete("/deletecourse/:id", async (req, res) => {
  try {
    const deleted = await Course_tb.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Deleted" });

  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
});

admin.get("/courses", async (req, res) => {
  try {
    const courses = await Course_tb.find();
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-Password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.delete("/delete-user/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.get("/course-progress/:courseId", async (req, res) => {
  try {
    const users = await User.find({
      EnrolledCourses: req.params.courseId
    });

    const result = users.map(user => {
      const progress = user.Progress.find(
        p => p.courseId.toString() === req.params.courseId
      );

      return {
        username: user.UserName,
        completed: progress?.isCompleted || false,
        completedAt: progress?.completedAt
      };
    });

    res.json({ users: result });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.post("/add-task", async (req, res) => {
  try {
    const { TaskTitle, Description, DueDate, CourseId } = req.body;

    const task = new Task({
      TaskTitle,
      Description,
      DueDate,
      Course: CourseId,
    });

    await task.save();
    res.status(201).json({ msg: "Task added" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.delete("/delete-task/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task deleted" });

  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
});

admin.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.post("/add-material", async (req, res) => {
  try {
    const { Title, Content, CourseId } = req.body;

    const material = new Material({
      Title,
      Content,
      Course: CourseId,
    });

    await material.save();
    res.status(201).json({ msg: "Material added" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.get("/materials/:courseId", async (req, res) => {
  try {
    const materials = await Material.find({
      Course: req.params.courseId,
    });

    res.json(materials);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

admin.delete("/delete-material/:id", async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Material not found" });

    res.json({ msg: "Material deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
admin.get("/course-users/:courseId", async (req, res) => {
  try {
    const users = await User.find({
      EnrolledCourses: req.params.courseId
    }).select("-Password");

    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default admin;