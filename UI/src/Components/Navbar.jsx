import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      console.log("Logout failed");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-purple-800 text-white shadow-md">

      <Link to="/" className="font-bold text-lg tracking-wide">
        Learnesta
      </Link>

      <div className="flex items-center gap-6">

        <NavLink to="/courses" className="hover:text-purple-200 transition">
          Courses
        </NavLink>

        {profile ? (
          <>
            <span className="text-sm text-purple-200">
              Hi, {profile.username}
            </span>

            <NavLink to="/dashboard" className="hover:text-purple-200 transition">
              Dashboard
            </NavLink>

            {isAdmin && (
              <NavLink to="/add-course" className="hover:text-purple-200 transition">
                Add Course
              </NavLink>
            )}

            <button
              onClick={onLogout}
              className="text-sm bg-white text-purple-800 px-3 py-1 rounded hover:bg-purple-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-purple-200 transition">
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className="bg-white text-purple-800 px-3 py-1 rounded hover:bg-purple-200 transition"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>

    </nav>
  );
}