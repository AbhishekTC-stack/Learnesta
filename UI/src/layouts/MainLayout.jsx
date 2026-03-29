import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <nav className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <h1
          className="font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          LEARNESTA
        </h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-purple-200 transition">Home</Link>
          <Link to="/courses" className="hover:text-purple-200 transition">Courses</Link>

          {/* Show Dashboard only if logged in */}
          {profile && (
            <Link
              to={profile.userRole === "admin" ? "/add-course" : "/dashboard"}
              className="hover:text-purple-200 transition"
            >
              Dashboard
            </Link>
          )}

          <Link to="/contact" className="hover:text-purple-200 transition">Contact</Link>

          {/* Show Login if not logged in */}
          {!profile && (
            <Link
              to="/login"
              className="bg-white text-purple-800 px-4 py-1 rounded-full font-semibold hover:bg-purple-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-purple-800 text-white text-center p-4">
        © 2026 Learnesta. All rights reserved.
      </footer>

    </div>
  );
}
