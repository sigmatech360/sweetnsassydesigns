import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";

import emptyCartIcon from "../../assets/images/emptyCart.svg";
import cartImage from "../../assets/images/productFront.webp";
import { newInStoreProducts } from "../../data";
import { Accordion, FloatingLabel, Form } from "react-bootstrap";

const Cart = () => {
  const [itemsInCart, setItemsInCart] = useState(true);
  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb" className="themeBreadCrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/cart">Cart</Link>
                  </li>
                </ol>
              </nav>
            </div>

            {itemsInCart === true ? (
              <>
                <div className="cartItemsSec">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="cart-items-list">
                        <div className="cart-items-header">
                          <h4 className="cart-items-header-title">Product</h4>
                          <h4 className="cart-items-header-title">Total</h4>
                        </div>
                        <div className="cart-item">
                          <div className="cart-item-img">
                            <Link to={""}>
                              <img src={cartImage} alt="Cart Product Image" />
                            </Link>
                          </div>
                          <div className="cart-item-content">
                            <Link to={""} className="cart-item-name">
                              2023 Mermaid Princesses
                            </Link>
                            <p className="cart-item-price">$5.00</p>
                            <p className="cart-item-details">
                              <span className="cart-item-details-name">
                                Hoop Sizes & Cut Files:
                              </span>{" "}
                              <span className="cart-item-details-value">
                                4×4 Design
                              </span>
                            </p>
                            <div className="cart-item-qty">
                              <div className="cart-item-qtySelector">
                                <button>-</button>
                                <p>1</p>
                                <button>+</button>
                              </div>
                              <button className="cart-item-remove">
                                Remove item
                              </button>
                            </div>
                          </div>
                          <p className="cart-item-total">$10.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="cartOrderSummery">
                        <h4 className="cart-items-header-title">Cart totals</h4>
                        <Accordion defaultActiveKey="0" className="couponsInputDiv">
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Add coupons</Accordion.Header>
                            <Accordion.Body>
                              {/* <div className="couponsInputDiv">
                                <input type="text"  />
                              </div> */}
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Enter code"
                                // className=""
                              >
                                <Form.Control
                                  type="text"
                                  placeholder=""
                                />
                                <button className="coupanBtn">Apply</button>
                              </FloatingLabel>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <div className="cartOrderSummeryTotal">
                            <span>Estimated total</span>
                            <span>$10.00</span>
                        </div>
                      </div>
                      <div className="paymentOptions">
                        <div className="paymentOptionsOr">OR</div>
                      </div>
                      <Link className="proceedToCheckout" to={""}>Proceed to Checkout</Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-12">
                  <div className="woocommerce-empty-cart">
                    <img src={emptyCartIcon} alt="ICon" />
                    <h4 className="woocommerce-empty-cart-title">
                      Your cart is currently empty!
                    </h4>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="newDesignSec">
                    <div className="secHead">
                      <h2 className="secTitle">New in store</h2>
                    </div>
                  </div>
                </div>

                {newInStoreProducts.map((item, index) => (
                  <div className="col-lg-3 mb-4" key={index}>
                    <div className="productCard">
                      <div className="productCardImg">
                        <img
                          src={item.productImages.front}
                          alt={item.name}
                          className="img1 img-fluid"
                        />
                        <img
                          src={item.productImages.back}
                          alt={item.name}
                          className="img2 img-fluid"
                        />
                      </div>
                      <div className="productCardContent">
                        <h4 className="productCardName">{item.name}</h4>
                        <p className="productCardPrice">${item.price}</p>
                        <button className="cartNewPrdBtn">Select amount</button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Cart;
