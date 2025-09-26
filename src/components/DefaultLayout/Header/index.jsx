import React from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../../assets/images/headerLogo.webp";

import "./style.css";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <>
      <section className="headerTop">
        <Container>
          <div className="headerTopContent">
            <Link to={"/"} className="navbar-brand">
              <img src={logo} alt="Texas Logo" />
            </Link>
            <div className="headerSearchBar">
              <IoSearch size={22} />
              <input type="text" placeholder="Search for products" className="form-control" />
            </div>
          </div>
        </Container>
      </section>

      <Navbar expand="lg" className="mainNavBar bgBlack" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavLink to={"/"} className={`nav-link`}>
                Home
              </NavLink>

              <Dropdown id="services-dropdown">
                <Dropdown.Toggle
                  as="button"
                  className={`custom-toggle nav-link`}
                  aria-expanded="false"
                >
                  Shop
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavDropdown.Item as={Link} to="">
                    My account
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/checkout">
                    Checkout
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cart">
                    Cart
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/wishlist">
                    Wishlist
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/balance">
                    Balance
                  </NavDropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <NavLink to={"/need-sheets"} className={`nav-link`}>
                Need Sheets
              </NavLink>
              <NavLink to={"/contact-us"} className={`nav-link`}>
                Contact Us
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
