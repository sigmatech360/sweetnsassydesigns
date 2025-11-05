// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { sidebarData } from "../data/Data";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap ALL routes inside ProtectedRoute */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Routes>
              {sidebarData.map((section) =>
                section.items.map((item) => {
                  const Component = item.component;
                  if (!Component) return null;

                  return (
                    <Route
                      key={item.id}
                      path={item.path}
                      element={<Component title={item.title} />}
                    />
                  );
                })
              )}

              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Default */}
              <Route path="/" element={<div>Dashboard Page</div>} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
