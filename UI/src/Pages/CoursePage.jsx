import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CourseCard({ course, onEnroll, enrolledIds }) {
  const [showDesc, setShowDesc] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();

  const isEnrolled = enrolledIds.includes(course._id);

  const handleEnroll = () => {
    if (!profile) {
      navigate("/login");
      return;
    }
    onEnroll(course._id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">

      {/* Course Image */}
      <div className="h-40 bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg mb-4"></div>

      <h3 className="font-semibold text-lg text-gray-800">{course.CourseTitle}</h3>
      <p className="text-sm text-gray-500 mt-1">{course.CourseType}</p>
      <p className="text-purple-700 font-semibold text-sm mt-1">Rs. {course.Price}</p>

      <div className="flex gap-2 mt-4 flex-wrap">

        {/* View Details Button */}
        <button
          onClick={() => setShowDesc(!showDesc)}
          className="bg-purple-700 hover:bg-purple-800 transition text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          {showDesc ? "Hide Details" : "View Details"}
        </button>

        {/* Enroll Button */}
        {isEnrolled ? (
          <button
            disabled
            className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium cursor-not-allowed"
          >
            ✓ Enrolled
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            className="bg-white border border-purple-700 text-purple-700 hover:bg-purple-50 transition px-4 py-2 rounded-full text-sm font-medium"
          >
            {profile ? "Enroll Now" : "Login to Enroll"}
          </button>
        )}

      </div>

      {showDesc && (
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          {course.Description}
        </p>
      )}

    </div>
  );
}

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/getAllCourses", { credentials: "include" });
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch enrolled courses if logged in
  useEffect(() => {
    if (!profile) return;
    const fetchEnrolled = async () => {
      try {
        const res = await fetch("/api/class", { credentials: "include" });
        const data = await res.json();
        const ids = (data.enrolledCourses || []).map((c) => c._id);
        setEnrolledIds(ids);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEnrolled();
  }, [profile]);

  // Enroll handler
  const handleEnroll = async (courseId) => {
    try {
      const res = await fetch(`/api/enroll/${courseId}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setEnrolledIds([...enrolledIds, courseId]);
        setMessage("Successfully enrolled! Check your dashboard.");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.msg || "Enrollment failed");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setMessage("Something went wrong");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-600 text-white flex flex-col justify-between px-8 py-10 shadow-xl">
        <div>
          <div className="text-xl font-bold tracking-widest mb-12">LEARNESTA</div>

          <nav className="flex flex-col gap-6 text-sm">
            <p
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              Dashboard
            </p>
            <p className="font-bold text-purple-200 border-l-4 border-purple-300 pl-3">
              Browse Courses
            </p>
            <p
              onClick={() => navigate("/certification")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              Certificates
            </p>
          </nav>
        </div>

        {profile && (
          <p
            onClick={async () => { await logout(); navigate("/login"); }}
            className="cursor-pointer hover:text-gray-200 text-sm"
          >
            LOGOUT
          </p>
        )}
      </div>

      {/* Main Section */}
      <div className="flex-1 p-16">

        <h1 className="text-4xl font-bold mb-4 text-gray-800">Available Courses</h1>

        {/* Success/Error Message */}
        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm">
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-gray-400">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-400">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onEnroll={handleEnroll}
                enrolledIds={enrolledIds}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default CoursePage;
