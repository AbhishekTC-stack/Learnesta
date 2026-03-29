import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UploadMaterial = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        const res = await fetch("/api/getAllCourses", { credentials: "include" });
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
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
      const res = await fetch("/api/admin/add-material", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title: title, Content: content, CourseId: courseId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to add material");

      setSuccess("Study material added successfully!");
      setTitle("");
      setContent("");
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
            <p onClick={() => navigate("/add-activity")} className="cursor-pointer hover:text-purple-200 transition">
              ACTIVITY ADDING
            </p>
            <p className="cursor-pointer font-bold text-purple-200 border-l-4 border-purple-300 pl-3">
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
        <div className="bg-gray-100 rounded-3xl shadow-2xl w-[650px] p-10">

          <h2 className="text-center text-xl font-semibold mb-8">UPLOAD STUDY MATERIAL</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Course Dropdown */}
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

            {/* Title */}
            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">TITLE</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to React"
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
                required
              />
            </div>

            {/* Content */}
            <div className="flex items-start justify-between">
              <label className="w-40 text-sm font-semibold pt-3">CONTENT</label>
              <textarea
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type the study material content here..."
                className="flex-1 px-4 py-3 rounded-2xl shadow-inner bg-white"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-20 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-700 to-purple-900 hover:opacity-90"
              >
                UPLOAD MATERIAL
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMaterial;
