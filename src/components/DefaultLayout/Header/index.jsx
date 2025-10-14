import React, { useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaRegUser,
  FaShoppingBasket,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../../../assets/images/headerLogo.webp";
import "./style.css";
import { IoSearch } from "react-icons/io5";
import { useCart } from "../../../context/CartContext";

const Header = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems, cartCount, removeFromCart } = useCart();

  return (
    <>
      {/* ======= Top Header ======= */}
      <section className="headerTop">
        <Container>
          <div className="headerTopContent">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Texas Logo" />
            </Link>

            <div className="headerSearchBar desktop-search">
              <IoSearch size={22} />
              <input
                type="text"
                placeholder="Search for products"
                className="form-control"
              />
            </div>

            <div className="header-icons">
              <button
                className="mobile-search-btn"
                onClick={() => setIsSearchOpen(true)}
              >
                <IoSearch size={22} />
              </button>

              <Link to="/login">
                <FaRegUser />
              </Link>

              <button className="shopping-cart">
                <FaShoppingBasket />
                <span className="cartCounter">{cartCount}</span>
              </button>

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ======= Desktop Header ======= */}
      <header className="header-main d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="header-nav">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className="header-shop-menu"
                    onMouseEnter={() => setIsShopOpen(true)}
                    onMouseLeave={() => setIsShopOpen(false)}
                  >
                    <Link to="/shop">
                      Shop <FaChevronDown />
                    </Link>
                    <ul
                      className={`shop-dropdown-menu ${
                        isShopOpen ? "open" : ""
                      }`}
                    >
                      <li>
                        <Link to="/my-account">My Account</Link>
                      </li>
                      <li>
                        <Link to="/checkout">Checkout</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      <li>
                        <Link to="/balance">Balance</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/need-sheets">Need Sheets</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* ======= Cart / User ======= */}
            <div className="col-lg-4">
              <div className="header-end">
                <ul>
                  <li>
                    <Link to="/login">
                      <FaRegUser />
                    </Link>
                  </li>

                  <li
                    className="cart-dropdown"
                    onMouseEnter={() => setIsShopOpen(false)}
                  >
                    <Link to="/cart">
                      <div className="cart-icon-wrapper">
                        <FaShoppingBasket />
                        {cartCount > 0 && (
                          <span className="cartCounter">{cartCount}</span>
                        )}
                      </div>
                    </Link>

                    {/* ======= Cart Dropdown ======= */}
                    <ul className="cart-dropdown-menu">
                      {cartCount > 0 ? (
                        <>
                          {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                              <div className="cart-item-image">
                                <img
                                  src={item.productImages.front}
                                  alt={item.name}
                                />
                              </div>
                              <div className="cart-item-info">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">
                                  {item.quantity} × $
                                  {parseFloat(item.price).toFixed(2)}
                                </p>
                              </div>
                              <button
                                className="remove-cart-item"
                                onClick={() => removeFromCart(item.id)}
                              >
                                ×
                              </button>
                            </li>
                          ))}

                          <li className="cart-subtotal">
                            <span>Subtotal:</span>
                            <strong>
                              $
                              {cartItems
                                .reduce(
                                  (total, item) =>
                                    total +
                                    item.quantity * parseFloat(item.price),
                                  0
                                )
                                .toFixed(2)}
                            </strong>
                          </li>
                          <li className="cart-buttons">
                            <Link to="/cart" className="view-cart-btn">
                              View Cart
                            </Link>
                            <Link to="/checkout" className="checkout-btn">
                              Checkout
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li className="header-nocaritems">
                          <p>No products in the cart.</p>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======= Mobile Menu ======= */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <img src={logo} alt="Texas Logo" />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <button
                className="mobile-shop-toggle"
                onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
              >
                <Link to="/shop">Shop </Link>
                <FaChevronDown
                  className={isMobileShopOpen ? "rotate" : ""}
                />
              </button>
              <ul
                className={`mobile-submenu ${
                  isMobileShopOpen ? "open" : ""
                }`}
              >
                <li>
                  <Link
                    to="/my-account"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/checkout"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/balance"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Balance
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/need-sheets"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Need Sheets
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ======= Mobile Search Overlay ======= */}
      <div className={`mobile-search-overlay ${isSearchOpen ? "open" : ""}`}>
        <div className="mobile-search-box">
          <input type="text" placeholder="Search for products..." autoFocus />
          <button onClick={() => setIsSearchOpen(false)}>
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
