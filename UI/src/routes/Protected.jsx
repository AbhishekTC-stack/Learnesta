import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected({ role }) {
  const { profile } = useAuth();

  // Not logged in → redirect to login
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // Role required (e.g. admin) but user doesn't have it → redirect to dashboard
  if (role && profile.userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
