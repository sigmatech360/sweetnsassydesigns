import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { countriesData } from "../../data";
import { toast } from "react-toastify";

const stripePromise = loadStripe("pk_test_YourPublicKeyHere"); 

// ---------- Stripe Form Component ----------
const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
    } else {
      console.log("Payment Method Created:", paymentMethod);
      toast.success("Payment Method Added Successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <div className="creditcard-payment-flex">
        <input type="radio" checked readOnly />
        <h6> Credit / Debit Card </h6>
        <svg
          width="37"
          height="40"
          viewBox="0 0 64 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="64" height="40" rx="3" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.3333 16.6667V14H40.6667V16.6667H23.3333ZM23.3333 20.6667V26H40.6667V20.6667H23.3333ZM21.3333 13.3333C21.3333 12.9797 21.4738 12.6406 21.7239 12.3905C21.9739 12.1405 22.313 12 22.6667 12H41.3333C41.6869 12 42.0261 12.1405 42.2761 12.3905C42.5262 12.6406 42.6667 12.9797 42.6667 13.3333V26.6667C42.6667 27.0203 42.5262 27.3594 42.2761 27.6095C42.0261 27.8595 41.6869 28 41.3333 28H22.6667C22.313 28 21.9739 27.8595 21.7239 27.6095C21.4738 27.3594 21.3333 27.0203 21.3333 26.6667V13.3333Z"
            fill="#1E1E1E"
          />
        </svg>
      </div>

      <div className="creditcard-payment-box">
        <label>Card Details</label>
        <div className="card-element-box">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": { color: "#aaa" },
                },
                invalid: { color: "#dc3545" },
              },
            }}
          />
        </div>

        <div className="payment-country-box">
          <label htmlFor="">Country</label>
          <select className="billing-country-select">
            <option value="">Select a country</option>
            {countriesData.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <p>
            By providing your card information, you allow Sweet n Sassy Designs
            to charge your card for future payments in accordance with their
            terms.
          </p>
        </div>
      </div>

      <div className="payment-credit-button">
        <button type="submit">Add payment method</button>
      </div>
    </form>
  );
};

// ---------- Main Component ----------
const PaymentMethodsContent = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="payment-tab">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!showForm ? (
              <>
                <div className="payment-tab-content">
                  <p>No saved methods found.</p>
                </div>
                <div className="payment-tab-btn">
                  <button onClick={() => setShowForm(true)}>Add Payment Method</button>
                </div>
              </>
            ) : (
              <Elements stripe={stripePromise}>
                <StripePaymentForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsContent;
