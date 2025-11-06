import React from "react";
import { sidebarData } from "../data/Data";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import logo from "../assets/headerLogo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = window.location.pathname;
  
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* <div className="sidebar-header">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <button className="sidebar-close-btn" onClick={toggleSidebar}>
          <FiX size={22} />
        </button>
      </div> */}

      <div className="sidebar-sections">
        {sidebarData.map((item, index) => {
          const Icon = item.icon;
          return(
          <div key={index} className="sidebar-section">
            <ul className="sidebar-menu">
              <li key={item.id} className="sidebar-item">
                <Link
                  to={item.path}
                  className={`sidebar-link ${
                    pathname.includes(item.path)  ? "active" : ""
                  }`}
                >
                  <span className="sidebar-icon">
                    <Icon />
                  </span>
                  <span className="sidebar-text">{item.title}</span>
                </Link>
              </li>
            </ul>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Sidebar;
