// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../api/auth";
import { toast } from "react-toastify";
import { sidebarData } from "../data/Data";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data?.data));
        setUser(data?.data);
        toast.success("Login successful!");
        navigate(sidebarData[0].path, { replace: true });
      } else {
        toast.error(data?.message || "Invalid credentials");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed!");
    },
  });

  // ✅ LOGOUT
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data?.success) toast.success(data?.message || "Logged out successfully!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout failed, but session cleared");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login", { replace: true });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoggingIn: loginMutation.isLoading,
      }}
    >
      {loading ? <div className="text-center p-5">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

