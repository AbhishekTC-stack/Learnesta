import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminCertification = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getAllCourses", { credentials: "include" });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    };
    fetchCourses();
  }, []);

  // Fetch users enrolled in selected course
  useEffect(() => {
    if (!selectedCourse) return;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/course-users/${selectedCourse}`, { credentials: "include" });
        const data = await res.json();
        setEnrolledUsers(data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [selectedCourse]);

  // Issue certificate
  const markComplete = (userId, userName) => {
    setMessage(`✓ Certificate issued to ${userName}!`);
    setTimeout(() => setMessage(""), 3000);
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
            <p onClick={() => navigate("/add-course")} className="cursor-pointer hover:text-purple-200 transition">ADD/UPDATE COURSE</p>
            <p onClick={() => navigate("/course-management")} className="cursor-pointer hover:text-purple-200 transition">COURSE MANAGEMENT</p>
            <p onClick={() => navigate("/add-activity")} className="cursor-pointer hover:text-purple-200 transition">ACTIVITY ADDING</p>
            <p onClick={() => navigate("/upload-material")} className="cursor-pointer hover:text-purple-200 transition">STUDY MATERIALS</p>
            <p className="cursor-pointer font-bold text-purple-200 border-l-4 border-purple-300 pl-3">CERTIFICATION</p>
          </nav>
        </div>
        <p onClick={handleLogout} className="cursor-pointer hover:text-gray-200 text-lg">LOGOUT</p>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Certification Management</h1>
        <p className="text-gray-500 mb-8">Select a course to view enrolled students and issue certificates</p>

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* Course selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <label className="text-sm font-semibold text-gray-600 mb-3 block">SELECT COURSE</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="" hidden>Choose a course...</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>{c.CourseTitle}</option>
            ))}
          </select>
        </div>

        {/* Enrolled students */}
        {selectedCourse && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Enrolled Students
            </h2>

            {loading ? (
              <p className="text-gray-400">Loading students...</p>
            ) : enrolledUsers.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <p className="text-gray-400">No students enrolled in this course yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledUsers.map((user) => (
                  <div key={user._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-purple-400">
                        {user.FirstName?.[0] || "S"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.FirstName} {user.LastName}</p>
                        <p className="text-sm text-gray-400">@{user.UserName}</p>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => markComplete(user._id, `${user.FirstName} ${user.LastName}`)}
                        className="bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition"
                      >
                        Issue Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCertification;