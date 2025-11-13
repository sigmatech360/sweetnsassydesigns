import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AppRoutes from "../../routes/AppRoutes";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
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
  );
};

export default DashboardLayout;
