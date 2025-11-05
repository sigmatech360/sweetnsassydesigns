import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const location = useLocation();
  const authRoutes = ["/login", "/forgot-password"];
  const isAuthPage = authRoutes.includes(location.pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isAuthPage ? (
        <AppRoutes />
      ) : (
        <div className="dashboard dark-theme">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {isSidebarOpen && window.innerWidth < 992 && (
            <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
          )}
          <main className={`main-content ${isSidebarOpen ? "open" : "closed"}`}>
            <Header toggleSidebar={toggleSidebar} />
            <div className="page-container">
              <AppRoutes />
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default App;
