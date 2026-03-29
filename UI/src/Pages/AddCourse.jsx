import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseType, setCourseType] = useState("Self-Paced");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5000);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/addCourse", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CourseName: courseName,
          CourseId: courseId,
          CourseType: courseType,
          Description: description,
          Price: price,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Error adding course");
      }

      setSuccess("Course added successfully!");
      setCourseName("");
      setCourseId("");
      setCourseType("Self-Paced");
      setDescription("");
      setPrice(5000);

    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">

      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-purple-900 to-purple-600 text-white flex flex-col justify-between p-8">
        <div>
          <div className="flex items-center gap-4 mb-16">
            <div className="text-2xl">☰</div>
            <h1 className="text-xl tracking-widest">LEARNESTA</h1>
          </div>

          <h2 className="text-3xl font-semibold mb-12">ADMIN DASHBOARD</h2>

          <nav className="flex flex-col gap-6 text-lg">
            <p
              onClick={() => navigate("/add-course")}
              className="cursor-pointer hover:text-purple-200 transition font-bold text-purple-200"
            >
              ADD/UPDATE COURSE
            </p>
            <p
              onClick={() => navigate("/course-management")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              COURSE MANAGEMENT
            </p>
            <p
              onClick={() => navigate("/add-activity")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              ACTIVITY ADDING
            </p>
            <p
              onClick={() => navigate("/upload-material")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              STUDY MATERIALS
            </p>
            <p
              onClick={() => navigate("/admin-certification")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              CERTIFICATION
            </p>
          </nav>
        </div>

        <p
          onClick={handleLogout}
          className="cursor-pointer hover:text-gray-200 text-lg"
        >
          LOGOUT
        </p>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16">

        {/* Toggle Buttons */}
        <div className="flex rounded-full shadow-md overflow-hidden mb-16">
          <button className="px-10 py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-semibold">
            ADD COURSE
          </button>
          <button
            onClick={() => navigate("/edit-course/placeholder")}
            className="px-10 py-3 bg-gray-200 text-gray-600 font-semibold"
          >
            UPDATE COURSE
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-gray-100 rounded-3xl shadow-2xl w-[600px] p-10">

          <h2 className="text-center text-xl font-semibold mb-6">ADD COURSE</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">COURSE NAME</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">COURSE TYPE</label>
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
              >
                <option value="Self-Paced">Self-Paced</option>
                <option value="Instructor-Led">Instructor-Led</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">COURSE ID</label>
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="w-40 text-sm font-semibold">PRICING</label>
              <select
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="flex-1 px-4 py-2 rounded-full shadow-inner bg-white"
              >
                <option value="5000">Rs.5000</option>
                <option value="3500">Rs.3500</option>
                <option value="15000">Rs.15000</option>
              </select>
            </div>

            <div className="flex items-start justify-between">
              <label className="w-40 text-sm font-semibold pt-3">DESCRIPTION</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl shadow-inner bg-white"
                required
              />
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-20 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-700 to-purple-900 hover:opacity-90"
              >
                ADD COURSE
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
