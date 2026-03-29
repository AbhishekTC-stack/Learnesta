import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          UserName: username,
          Password: password,
          UserRole: "student",
        }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || "Signup Failed");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup Failed: Please Try Again!");
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">

      <div className="w-2/3 flex justify-center items-center bg-gray-50">
        <div className="bg-white rounded-3xl shadow-2xl px-16 py-12 w-[480px] border border-gray-100">

          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
            Create Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <input type="text" placeholder="First Name" value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" required />

            <input type="text" placeholder="Last Name" value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" />

            <input type="text" placeholder="Username" value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" required />

            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" required />

            <button type="submit"
              className="px-12 py-3 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-800 transition">
              Sign Up
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-700 font-semibold">Login</Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/3 bg-gradient-to-b from-purple-900 to-purple-600 flex justify-center items-center">
        <div className="text-white text-6xl font-bold text-center">
          Sign <br /> Up
        </div>
      </div>

    </div>
  );
};

export default Signup;