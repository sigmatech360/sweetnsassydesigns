import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  BiSearch,
  BiBell,
  BiChevronDown,
  BiUser,
  BiLogOut,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/headerLogo.png";
import { FiX } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {
  const { user, logout, isLoggingIn } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Search handler
  // const handleSearch = () => {
  //   if (searchQuery.trim() === "") return;
  //   alert(`Searching for: ${searchQuery}`);
  // };

  // Logout handler
  const handleLogout = () => {
    logout();
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile search animation
  // useEffect(() => {
  //   if (mobileSearchOpen) {
  //     setShowSearch(true);
  //   } else {
  //     const timer = setTimeout(() => setShowSearch(false), 250);
  //     return () => clearTimeout(timer);
  //   }
  // }, [mobileSearchOpen]);

  return (
    <header className="navbar-header">
      <Container fluid>
        <Row>
          <Col lg={8} md={5} sm={5} xs={5}>
            <div className="header-toggle-search">
              <button onClick={toggleSidebar}>☰</button>
              {/* <div className="header-search">
                {isMobile && showSearch && (
                  <div
                    className={`mobile-search-overlay ${
                      mobileSearchOpen ? "open" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button className="search-btn" onClick={handleSearch}>
                      <BiSearch size={18} />
                    </button>
                    <button
                      className="close-search-btn"
                      onClick={() => setMobileSearchOpen(false)}
                    >
                      ✕
                    </button>
                  </div>
                )}

                {!isMobile && (
                  <>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <span onClick={handleSearch}>
                      <BiSearch />
                    </span>
                  </>
                )}

                {isMobile && !mobileSearchOpen && (
                  <span onClick={() => setMobileSearchOpen(true)}>
                    <BiSearch />
                  </span>
                )}
              </div> */}
              <div className="header-brand">
                  <img src={logo} alt="logo" />
                {/* <Link to="/">
                </Link> */}
                {/* <button className="sidebar-close-btn" onClick={toggleSidebar}>
                  <FiX size={22} />
                </button> */}
              </div>
            </div>
          </Col>

          <Col lg={4} md={7} sm={7} xs={7}>
            <div className="header-end">
              <ul>
                {/* <li>
                  <BiBell size={22} />
                </li> */}

                {/* ✅ Authenticated user dropdown */}
                {user ? (
                  <li className="profile-wrapper" ref={dropdownRef}>
                    <div
                      className="header-profile"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        src={
                          user?.avatar ||
                          "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
                        }
                        alt="profile"
                        className="profile-img"
                      />
                      <span className="profile-name">
                        {user?.name || user?.username || "User"}
                      </span>
                      <BiChevronDown size={18} />
                    </div>

                    {dropdownOpen && (
                      <div className="profile-dropdown">
                        {/* <Link to="/profile" className="dropdown-item"><BiUser /> Profile Settings</Link> */}
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                          disabled={isLoggingIn}
                        >
                          <BiLogOut /> Logout
                        </button>
                      </div>
                    )}
                  </li>
                ) : (
                  <li>
                    <Link to="/login" className="themebtn">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
