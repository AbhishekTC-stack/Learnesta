import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CourseManagementAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getAllCourses`, { credentials: "include" });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/deletecourse/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setCourses(courses.filter((c) => c._id !== id));
        alert("Course deleted successfully");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  // UPDATE - simple prompt for now
  const handleUpdate = async (course) => {
    const newTitle = prompt("Enter new course title:", course.CourseTitle);
    if (!newTitle) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/updatecourse/${course._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CourseTitle: newTitle }),
      });
      if (res.ok) {
        fetchCourses();
        alert("Course updated successfully");
      }
    } catch (err) {
      alert("Update failed");
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
            <p className="cursor-pointer font-bold text-purple-200 border-l-4 border-purple-300 pl-3">
              COURSE MANAGEMENT
            </p>
            <p onClick={() => navigate("/add-activity")} className="cursor-pointer hover:text-purple-200 transition">
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
      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
            <p className="text-gray-500 mt-1">Manage all your courses here</p>
          </div>
          <button
            onClick={() => navigate("/add-course")}
            className="bg-purple-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-purple-800 transition"
          >
            + Add Course
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No courses added yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">

                <div className="h-36 bg-gradient-to-br from-purple-200 to-purple-400 rounded-xl mb-4"></div>

                <h3 className="font-semibold text-lg text-gray-800">{course.CourseTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">{course.CourseType} · Rs.{course.Price}</p>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.Description}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleUpdate(course)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseManagementAdmin;
