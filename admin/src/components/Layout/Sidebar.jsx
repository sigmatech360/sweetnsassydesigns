import React from "react";
import { sidebarData } from "../../data/Data";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const location = useLocation();
  const pathname = location.pathname;
  let newPath = pathname.split('/')[1];
  
  
  
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-sections">
        {sidebarData.map((item, index) => {
          const Icon = item.icon;
          let isActive = item.path.split('/')[1].includes(newPath);
            
          return(  
          <div key={index} className="sidebar-section">
            <ul className="sidebar-menu">
              <li key={item.id} className="sidebar-item">
                <Link
                  to={item.path}
                  className={`sidebar-link ${item.path} ${
                    isActive  ? "active" : ""
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
