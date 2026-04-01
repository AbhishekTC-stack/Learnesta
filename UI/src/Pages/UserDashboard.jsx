import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trialStatus, setTrialStatus] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Fetch enrolled courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/class`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setEnrolledCourses(data.enrolledCourses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch trial status
  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/trial-status`, { credentials: "include" });
        const data = await res.json();
        setTrialStatus(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrial();
  }, []);

  // If trial expired redirect to payment page
 useEffect(() => {
  if (trialStatus?.trialExpired && !trialStatus?.isPaid) {
    navigate("/payment");
  }
}, [trialStatus]);

  // Trial badge color
  const getTrialColor = () => {
    if (!trialStatus) return "";
    if (trialStatus.isPaid) return "bg-green-100 text-green-700 border-green-200";
    if (trialStatus.daysLeft <= 5) return "bg-red-100 text-red-700 border-red-200";
    if (trialStatus.daysLeft <= 10) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-purple-100 text-purple-700 border-purple-200";
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-600 text-white flex flex-col justify-between p-8">
        <div>
          <div className="text-xl font-bold tracking-widest mb-12">LEARNESTA</div>
          <nav className="flex flex-col gap-6 text-sm">
            <p className="font-bold text-purple-200 border-l-4 border-purple-300 pl-3">Dashboard</p>
            <p onClick={() => navigate("/courses")} className="cursor-pointer hover:text-purple-200">Browse Courses</p>
            <p onClick={() => navigate("/certification")} className="cursor-pointer hover:text-purple-200">Certificates</p>
          </nav>
        </div>
        <p onClick={handleLogout} className="cursor-pointer hover:text-gray-200 text-sm">LOGOUT</p>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        {/* Welcome */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Welcome back, {profile?.firstName || profile?.username}! 👋
        </h1>
        <p className="text-gray-500 mb-6">Here's your learning progress</p>

        {/* Trial Status Banner */}
        {trialStatus && !trialStatus.isPaid && (
          <div className={`border rounded-2xl px-6 py-4 mb-8 flex items-center justify-between ${getTrialColor()}`}>
            <div>
              <p className="font-semibold text-base">
                {trialStatus.daysLeft > 0
                  ? `Free Trial — ${trialStatus.daysLeft} days remaining`
                  : "Your free trial has expired!"}
              </p>
              <p className="text-sm mt-1 opacity-80">
                {trialStatus.daysLeft > 0
                  ? "Enjoy full access to all courses during your trial period."
                  : "Please complete payment to continue learning."}
              </p>
            </div>
            {trialStatus.daysLeft <= 10 && (
              <button
                onClick={() => navigate("/payment")}
                className="bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition flex-shrink-0 ml-4"
              >
                Pay Now
              </button>
            )}
          </div>
        )}

        {/* Paid Badge */}
        {trialStatus?.isPaid && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-6 py-4 mb-8 flex items-center gap-3">
            <span className="text-xl">✓</span>
            <p className="font-semibold">Premium Member — Full Access Active</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Enrolled Courses</p>
            <p className="text-3xl font-bold text-purple-700">{enrolledCourses.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Username</p>
            <p className="text-xl font-bold text-gray-700">{profile?.username}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Trial Days Left</p>
            <p className={`text-3xl font-bold ${trialStatus?.isPaid ? "text-green-600" : trialStatus?.daysLeft <= 5 ? "text-red-600" : "text-purple-700"}`}>
              {trialStatus?.isPaid ? "∞" : trialStatus?.daysLeft ?? "—"}
            </p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Enrolled Courses</h2>

        {loading ? (
          <p className="text-gray-400">Loading courses...</p>
        ) : enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => navigate("/courses")}
              className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="h-32 bg-gradient-to-br from-purple-200 to-purple-400 rounded-xl mb-4"></div>
                <h3 className="font-semibold text-gray-800">{course.CourseTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">{course.CourseType}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition"
                  >
                    Start Learning
                  </button>
                  <button
                    onClick={() => navigate("/certification")}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition"
                  >
                    Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
