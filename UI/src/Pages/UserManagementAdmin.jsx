import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserManagementAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users", {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/delete-user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
        alert("User deleted");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar reuse same style */}
      <div className="w-72 bg-purple-800 text-white p-8">
        <h2 className="text-2xl mb-10">ADMIN</h2>

        <p onClick={() => navigate("/course-management")} className="cursor-pointer mb-4">
          Courses
        </p>

        <p className="font-bold text-purple-200">
          Users
        </p>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        <div className="grid grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-5 rounded-xl shadow">

              <h3 className="font-bold text-lg">{user.UserName}</h3>
              <p className="text-sm text-gray-500">
                {user.FirstName} {user.LastName}
              </p>

              <p className="text-xs text-purple-600 mt-2">
                Role: {user.UserRole}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Courses: {user.EnrolledCourses?.length || 0}
              </p>

              <button
                onClick={() => handleDelete(user._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default UserManagementAdmin;