import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(userName, password);
      if (user.userRole === "admin") {
        navigate("/add-course");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (

  
    <div className="min-h-screen flex font-sans bg-white">
      <div className="w-2/3 flex justify-center items-center">
        <div className="bg-white rounded-3xl shadow-2xl px-16 py-14 w-[480px]">

          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-7">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="px-6 py-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-6 py-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="px-12 py-4 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-800 transition"
            >
              Log in
            </button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-700 font-semibold">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/3 bg-gradient-to-b from-purple-800 to-purple-600 flex justify-center items-center">
        <div className="text-white text-7xl font-bold">
          Log <br /> in
        </div>
      </div>
    </div>
  );
}

export default Login;