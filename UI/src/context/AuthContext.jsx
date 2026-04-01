import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);

  const login = async (UserName, Password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName, Password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || "Login failed");
    }

    const data = await res.json();
    setProfile(data.user); // { username, firstName, lastName, userRole }
    return data.user;
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/logout", { credentials: "include" });
    setProfile(null);
  };

  const isAdmin = profile?.userRole === "admin";

  return (
    <AuthContext.Provider value={{ profile, setProfile, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
