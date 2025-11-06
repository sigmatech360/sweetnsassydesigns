  // src/routes/ProtectedRoute.jsx
  import React from "react";
  import { Navigate, useLocation } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
import { sidebarData } from "../data/Data";

  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="text-center p-5">Loading...</div>;

    const publicRoutes = ["/login", "/forgot-password"];

    if (!user && !publicRoutes.includes(location.pathname)) {
      return <Navigate to="/login" replace />;
    }

    if (user && publicRoutes.includes(location.pathname)) {
      return <Navigate to={sidebarData[0].path} replace />;
    }

    return children;
  };

  export default ProtectedRoute;
