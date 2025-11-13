import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import DashboardLayout from "./components/Layout";

const App = () => {


  const location = useLocation();
  const authRoutes = ["/login", "/forgot-password"];
  const isAuthPage = authRoutes.includes(location.pathname);

 

  return (
    <>
      {isAuthPage ? (
        <AppRoutes />
      ) : (
        <DashboardLayout/>
      )}
      {/* <ScreenLoader/> */}
    </>
  );
};

export default App;
