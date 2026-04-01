import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddActivity = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [courses, setCourses] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseId, setCourseId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Fetch courses for dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getAllCourses`, { credentials: "include" });
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : data.courses || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/add-task`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TaskTitle: taskTitle,
          Description: description,
          DueDate: dueDate,
          CourseId: courseId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Failed to add task");
      }

      setSuccess("Activity added successfully!");
      setTaskTitle("");
      setDescription("");
      setDueDate("");
      setCourseId("");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-200">

      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-purple-900 to-purple-600 text-white flex flex-col justify-between p-8">
        <div>
          <div className="flex items-center gap-4 mb-16">
            <div className="text-2xl">☰</div>
            <h1 className="text-xl tracking-widest">LEARNESTA</h1>
          </div>

          <h2 className="text-3xl font-semibold mb-12">ADMIN DASHBOARD</h2>

          <nav className="flex flex-col gap-6 text-lg">
            <p onClick={() => navigate("/add-course")} className="cursor-pointer hover:text-purple-200 transition">
              ADD/UPDATE COURSE
            </p>
            <p onClick={() => navigate("/course-management")} className="cursor-pointer hover:text-purple-200 transition">
              COURSE MANAGEMENT
            </p>
            <p className="cursor-pointer font-bold text-purple-200 border-l-4 border-purple-300 pl-3">
              ACTIVITY ADDING
            </p>
            <p onClick={() => navigate("/upload-material")} className="cursor-pointer hover:text-purple-200 transition">
              STUDY MATERIALS
            </p>
               <p
              onClick={() => navigate("/users")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              USER MANAGEMENT
            </p>
            <p onClick={() => navigate("/admin-certification")} className="cursor-pointer hover:text-purple-200 transition">
              CERTIFICATION
            </p>
          </nav>
        </div>

        <p onClick={handleLogout} className="cursor-pointer hover:text-gray-200 text-lg">
          LOGOUT
        </p>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 px-8">

        <div className="bg-gray-100 rounded-3xl shadow-2xl w-[600px] p-10">

          <h2 className="text-center text-xl font-semibold mb-8">ADD ACTIVITY / TASK</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Course */}
            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">COURSE</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
                required
              >
                <option value="" hidden>Select a course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>{c.CourseTitle}</option>
                ))}
              </select>
            </div>

            {/* Task Title */}
            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">TASK TITLE</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
                placeholder="e.g. Build a REST API"
                required
              />
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">DUE DATE</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
                required
              />
            </div>

            {/* Description */}
            <div className="flex items-start justify-between">
              <label className="w-40 text-sm font-semibold pt-3">DESCRIPTION</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl shadow-inner bg-white"
                placeholder="Describe the task..."
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-20 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-700 to-purple-900 hover:opacity-90"
              >
                ADD ACTIVITY
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
