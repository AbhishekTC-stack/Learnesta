import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Certificate from "../Components/Certificate";
import { useAuth } from "../context/AuthContext";

const CertificationPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/class", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch enrolled courses");
        const data = await res.json();
        setEnrolledCourses(data.enrolledCourses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    const saved = localStorage.getItem("learnesta_completed");
    if (saved) setCompletedCourses(JSON.parse(saved));
  }, []);

  const handleViewCertificate = (course) => {
    setSelectedCourse(course);
    setTimeout(() => {
      document.getElementById("certificate-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading your courses...</p>;

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-600 text-white flex flex-col justify-between p-8">
        <div>
          <div className="text-xl font-bold tracking-widest mb-12">LEARNESTA</div>
          <nav className="flex flex-col gap-6 text-sm">
            <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-purple-200">Dashboard</p>
            <p onClick={() => navigate("/courses")} className="cursor-pointer hover:text-purple-200">Browse Courses</p>
            <p className="font-bold text-purple-200 border-l-4 border-purple-300 pl-3">Certificates</p>
          </nav>
        </div>
        <p onClick={handleLogout} className="cursor-pointer hover:text-gray-200 text-sm">LOGOUT</p>
      </div>

      {/* Main */}
      <div className="flex-1">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-purple-600 text-white py-12 px-10 text-center">
          <h1 className="text-4xl font-bold tracking-wide">My Certificates</h1>
          <p className="mt-2 text-purple-200 text-sm">
            Complete your courses and earn your certificate
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          {enrolledCourses.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl">You haven't enrolled in any courses yet.</p>
              <a href="/courses" className="mt-4 inline-block text-purple-700 font-semibold hover:underline">
                Browse Courses →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Your Enrolled Courses</h2>

              {enrolledCourses.map((course) => {
                const isComplete = !!completedCourses[course._id];
                return (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${isComplete ? "bg-green-500" : "bg-purple-400"}`}>
                        {isComplete ? "✓" : course.CourseTitle?.[0] || "C"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{course.CourseTitle}</p>
                        <p className="text-sm text-gray-400">
                          {isComplete
                            ? `Completed on ${new Date(completedCourses[course._id]).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`
                            : "In progress — awaiting admin approval"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                      {isComplete ? (
                        <button
                          onClick={() => handleViewCertificate(course)}
                          className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
                        >
                          View Certificate
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400 italic px-4 py-2">
                          Certificate pending
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Certificate display */}
          {selectedCourse && (
            <div id="certificate-section" className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Your Certificate</h2>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  ✕ Close
                </button>
              </div>
              <Certificate
                courseName={selectedCourse.CourseTitle}
                completionDate={completedCourses[selectedCourse._id]}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CertificationPage;