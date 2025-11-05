import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";

import emptyCartIcon from "../../assets/images/emptyCart.svg";
import cartImage from "../../assets/images/productFront.webp";
import { newInStoreProducts } from "../../data";
import { Accordion, FloatingLabel, Form } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <DefaultLayout>
      <div className="container">
        <div className="row">
          {cartItems.length > 0 ? (
            <>
              <div className="cartItemsSec">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cart-items-list">
                      <div className="cart-items-header">
                        <h4 className="cart-items-header-title">Product</h4>
                        <h4 className="cart-items-header-title">Total</h4>
                      </div>
                       {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <div className="cart-item-img">
                            <Link to={`/product/${item.id}`}>
                              <img src={item.productImages?.front} alt={item.name} />
                            </Link>
                          </div>

                          <div className="cart-item-content">
                            <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                            <p className="cart-item-price">${item.price}</p>
                            <p className="cart-item-details">
                              <span className="cart-item-details-name">Hoop Sizes & Cut Files:</span>{" "}
                              <span className="cart-item-details-value">4×4 Design</span>
                            </p>

                            <div className="cart-item-qty">
                              <div className="cart-item-qtySelector">
                                <button onClick={() => addToCart(item, -1) }> - </button>
                                <p>{item.quantity}</p>
                                <button onClick={() => addToCart(item, 1)} > + </button>
                              </div>
                              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                                Remove item
                              </button>
                            </div>
                          </div>
                          <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
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
                            <FloatingLabel controlId="floatingInput" label="Enter code" >
                              <Form.Control type="text" placeholder="" />
                              <button className="coupanBtn">Apply</button>
                            </FloatingLabel>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <div className="cartOrderSummeryTotal">
                        <span>Estimated total</span>
                        <span>${totalAmount}</span>
                      </div>
                    </div>
                    <div className="paymentOptions">
                      <div className="paymentOptionsOr">OR</div>
                    </div>
                    <Link className="proceedToCheckout" to={"/checkout"}>Proceed to Checkout</Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-12">
                <div className="woocommerce-empty-cart">
                  <img src={emptyCartIcon} alt="ICon" />
                  <h4 className="woocommerce-empty-cart-title">Your cart is currently empty!</h4>
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
                      <img src={item.productImages.front} alt={item.name} className="img1 img-fluid"/>
                      <img src={item.productImages.back} alt={item.name} className="img2 img-fluid"/>
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
    </DefaultLayout>
  );
};

export default Cart;
