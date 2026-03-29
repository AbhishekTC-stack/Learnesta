import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [materials, setMaterials] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("materials");
  const [openMaterial, setOpenMaterial] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleMaterialComplete = () => {
    toast.success("Completed analysing the syllabus!");
  };

  const handleTaskSubmit = () => {
    toast.success("Task submitted successfully!");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`/api/enroll/${courseId}`, {
          method: "POST",
          credentials: "include",
        });

        const matRes = await fetch(`/api/materials/${courseId}`, {
          credentials: "include",
        });

        if (matRes.ok) {
          const matData = await matRes.json();
          setMaterials(matData);
        } else {
          setMaterials([]);
        }

        const taskRes = await fetch(`/api/tasks/${courseId}`, {
          credentials: "include",
        });

        if (taskRes.ok) {
          const taskData = await taskRes.json();
          setTasks(taskData.tasks);
        } else {
          setTasks([]);
        }

        const courseRes = await fetch(`/api/getAllCourses`, {
          credentials: "include",
        });

        const courseData = await courseRes.json();
        const found = courseData.find((c) => c._id === courseId);
        if (found) setCourseName(found.CourseTitle);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-600 text-white flex flex-col justify-between p-8">
        <div>
          <div className="text-xl font-bold mb-12">LEARNESTA</div>
          <nav className="flex flex-col gap-6 text-sm">
            <p onClick={() => navigate("/dashboard")} className="cursor-pointer">Dashboard</p>
            <p onClick={() => navigate("/courses")} className="cursor-pointer">Browse Courses</p>
            <p className="font-bold">Study Material</p>
          </nav>
        </div>
        <p onClick={handleLogout} className="cursor-pointer">LOGOUT</p>
      </div>

      <div className="flex-1 p-10">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-purple-700 mb-4"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-2">
          {courseName || "Course"}
        </h1>

        <p className="text-gray-500 mb-6">
          Study materials and tasks
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 rounded ${
              activeTab === "materials"
                ? "bg-purple-700 text-white"
                : "bg-white border"
            }`}
          >
            Materials ({materials.length})
          </button>

          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded ${
              activeTab === "tasks"
                ? "bg-purple-700 text-white"
                : "bg-white border"
            }`}
          >
            Tasks ({tasks.length})
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === "materials" && (
              <div className="space-y-4">
                {materials.length === 0 ? (
                  <p>No materials available</p>
                ) : (
                  materials.map((mat) => (
                    <div key={mat._id} className="bg-white p-4 rounded shadow">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() =>
                          setOpenMaterial(
                            openMaterial === mat._id ? null : mat._id
                          )
                        }
                      >
                        <h3>{mat.Title}</h3>
                        <span>{openMaterial === mat._id ? "▲" : "▼"}</span>
                      </div>

                      {openMaterial === mat._id && (
                        <>
                          <p className="mt-2 text-gray-600">{mat.Content}</p>

                          <button
                            onClick={handleMaterialComplete}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                          >
                            Mark as Completed
                          </button>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "tasks" && (
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <p>No tasks available</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task._id} className="bg-white p-4 rounded shadow">
                      <h3>{task.TaskTitle}</h3>
                      <p>{task.Description}</p>
                      <p className="text-red-500 text-sm">
                        {new Date(task.DueDate).toLocaleDateString()}
                      </p>

                      <button
                        onClick={handleTaskSubmit}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Submit Task
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;