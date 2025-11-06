import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import ScreenLoader from "./components/Shared/ScreenLoader/ScreenLoader";

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
            <Header toggleSidebar={toggleSidebar} />
          <main className={`main-content ${isSidebarOpen ? "open" : "closed"}`}>
            <div className="page-container">
              <AppRoutes />
            </div>
          </main>
        </div>
      )}
      {/* <ScreenLoader/> */}
    </>
  );
};

export default App;
