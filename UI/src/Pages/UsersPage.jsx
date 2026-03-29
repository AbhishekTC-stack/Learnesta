import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users", {
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
      const res = await fetch(`/api/admin/delete-user/${id}`, {
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

        <p onClick={() => navigate("/course-management")} className="cursor-pointer mb-4">
          Courses
        </p>
        <p className="font-bold mb-4">Users</p>
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