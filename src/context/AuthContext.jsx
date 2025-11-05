import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, logoutUser } from "../api/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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


  useEffect(() => {
    if (!loading) {
      if (user && (location.pathname === "/login" || location.pathname === "/register")) {
        navigate("/my-account", { replace: true });
      } else if (!user && location.pathname.startsWith("/my-account")) {
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  //  LOGIN
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data?.data));
        setUser(data?.data);
        toast.success("Login successful!");
        navigate("/my-account");
      } else {
        toast.error(data?.message || "Invalid credentials");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed!");
    },
  });

  //  REGISTER
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Registration link sent to your email!");
      } else {
        toast.error(data?.message || "Registration failed!");
      }
    },
    onError: (error) => {
      const err = error.response?.data;
      if (err?.data?.email?.[0]) {
        toast.error(err.data.email[0]);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Registration failed!");
      }
    },
  });

  //  LOGOUT
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Logged out successfully!");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Logout failed, but session cleared ");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading, 
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        isLoggingIn: loginMutation.isLoading,
        isRegistering: registerMutation.isLoading,
      }}
    >
      {loading ? <div className="text-center p-5">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
