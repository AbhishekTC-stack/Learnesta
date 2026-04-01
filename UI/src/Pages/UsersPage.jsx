import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
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

      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white p-6">
        <h2 className="text-xl mb-10">ADMIN</h2>
           <nav className="flex flex-col gap-6 text-lg">
            <p
              onClick={() => navigate("/add-course")}
              className="cursor-pointer hover:text-purple-200 transition"
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
              onClick={() => navigate("/users")}
              className="cursor-pointer hover:text-purple-200 transition  font-bold text-purple-200"
            >
              USER MANAGEMENT
            </p>
            <p
              onClick={() => navigate("/admin-certification")}
              className="cursor-pointer hover:text-purple-200 transition"
            >
              CERTIFICATION
            </p>
          </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="bg-white p-5 rounded shadow">

                <h2 className="font-semibold text-lg">
                  {user.FirstName} {user.LastName}
                </h2>

                <p className="text-gray-500 text-sm">
                  @{user.UserName}
                </p>

                <p className="text-sm mt-2">
                  Role: {user.UserRole}
                </p>

                <p className="text-sm">
                  Paid: {user.IsPaid ? "Yes" : "No"}
                </p>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;