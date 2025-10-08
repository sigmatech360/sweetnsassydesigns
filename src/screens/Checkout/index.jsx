import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { Accordion, FloatingLabel, Form } from "react-bootstrap";
import { countriesData } from "../../data";
import { IoIosArrowRoundBack } from "react-icons/io";

import checkoutAlertIcon from "../../assets/images/checkoutAlertIcon.svg";
import orderSummeryImg from "../../assets/images/orderSummeryImg.png";

const Checkout = () => {
  const [showAddAppartment, setshowAddAppartment] = useState(false);
  return (
    <DefaultLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cart-points-message">
                <img src={checkoutAlertIcon} alt="" />
                <p>
                  If you proceed to checkout, you will earn <strong>10</strong>{" "}
                  Points!
                </p>
              </div>
            </div>

            {/* Start */}
            <div className="col-lg-8">
              <div className="expressPayment-title">Express Checkout</div>
              <div className="expressPayment"></div>
              <div>
                <div className="paymentOptionsOr">Or continue below</div>
              </div>
              <div className="divCheckoutForm">
                <h4 className="divCheckoutForm-title">Contact information</h4>
                <p className="divCheckoutForm-description">
                  We'll use this email to send you details and updates about
                  your order.
                </p>
                <div className="divCheckoutForm-input">
                  <FloatingLabel label="Email address">
                    <Form.Control type="email" placeholder="" />
                  </FloatingLabel>
                </div>
              </div>

              <div className="divCheckoutForm">
                <h4 className="divCheckoutForm-title">Billing address</h4>
                <p className="divCheckoutForm-description">
                  Enter the billing address that matches your payment method.
                </p>
                <div className="row">
                  <div className="divCheckoutForm-input col-lg-12 mb-3">
                    <FloatingLabel label="Country/Region">
                      <Form.Select className="form-control" defaultValue="US">
                        <option value="" disabled>
                          Select a country/region
                        </option>
                        {countriesData.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </div>

                  <div className="divCheckoutForm-input col-lg-6 mb-3">
                    <FloatingLabel label="First Name">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>
                  <div className="divCheckoutForm-input col-lg-6 mb-3">
                    <FloatingLabel label="Last Name">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>

                  <div className="divCheckoutForm-input col-lg-12 mb-3">
                    <FloatingLabel label="Address">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>

                  <div className="divCheckoutForm-input col-lg-12 mb-3">
                    {!showAddAppartment && (
                      <button
                        className="addPpartment"
                        onClick={() => setshowAddAppartment(true)}
                      >
                        + Add apartment, suite, etc.
                      </button>
                    )}
                    {showAddAppartment && (
                      <FloatingLabel label="Apartment, suite, etc. (optional)">
                        <Form.Control type="text" placeholder="" />
                      </FloatingLabel>
                    )}
                  </div>

                  <div className="divCheckoutForm-input col-lg-6 mb-3">
                    <FloatingLabel label="City">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>
                  <div className="divCheckoutForm-input col-lg-6 mb-3">
                    <FloatingLabel label="State/County">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>

                  <div className="divCheckoutForm-input col-lg-6 mb-3">
                    <FloatingLabel label="Postal code">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>
                  <div className="divCheckoutForm-input col-lg-6 mb-3">
                    <FloatingLabel label="Phone (optional)">
                      <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                  </div>
                </div>
              </div>

              <div className="divCheckoutForm">
                <h4 className="divCheckoutForm-title">Payment options</h4>
              </div>

              <div className="checkoutActionDiv">
                <Link className="returnToCart">
                  <IoIosArrowRoundBack size={24} /> Return to Cart
                </Link>
                <button className="proceedToCheckout">Place Order</button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkoutOrderSummery">
                <h4>Order summary</h4>

                <div className="checkoutOrderSummeryItem">
                  <div className="order-summary-item__image">
                    <span className="order-summary-item__quantity"></span>
                    <img src={orderSummeryImg} alt="" />
                  </div>
                  <div className="product-metadata">
                    <p>2023 Mermaid Princesses</p>
                    <p className="price">$5.00</p>
                    <p>
                      <span className="product-details__name">
                        Hoop Sizes & Cut Files:
                      </span>{" "}
                      4×4 Design
                    </p>
                  </div>
                  <p className="order-summary-totalPrice">$10.00</p>
                </div>

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
                        <Form.Control type="text" placeholder="" />
                        <button className="coupanBtn">Apply</button>
                      </FloatingLabel>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <div className="checkoutOrderSummeryTotal">
                  <p>Subtotal</p>
                  <h5>$10.00</h5>
                </div>
                <div className="checkoutOrderSummeryFinalTotal">
                  <h5>Subtotal</h5>
                  <h5>$10.00</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default Checkout;
