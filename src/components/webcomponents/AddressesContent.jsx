import React, { useState } from "react";
import BillingForm from '../webcomponents/BillingForm'
import ShippingForm from '../webcomponents/ShippingForm'

const AddressesContent = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <>
      <div className="addresses-tab">
        <div className="container">
          <div className="row">
            {activeForm === null && (
              <div className="col-lg-12">
                <div className="addresses-tab-content">
                  <p>
                    The following addresses will be used on the checkout page by
                    default.
                  </p>
                </div>
              </div>
            )}

            {activeForm === null && (
              <>
                <div className="col-lg-6">
                  <div className="billing-shipping-adress">
                    <h2>Billing address</h2>
                    <button onClick={() => setActiveForm("billing")}>
                      Add Billing address
                    </button>
                    <p>You have not set up this type of address yet.</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="billing-shipping-adress">
                    <h2>Shipping address</h2>
                    <button onClick={() => setActiveForm("shipping")}>
                      Add Shipping address
                    </button>
                    <p>You have not set up this type of address yet.</p>
                  </div>
                </div>
              </>
            )}

            {/* Billing Form */}
            {activeForm === "billing" && (
              <div className="col-lg-12">
                <BillingForm />
                {/* <button onClick={() => setActiveForm(null)}>Back</button> */}
              </div>
            )}

            {/* Shipping Form */}
            {activeForm === "shipping" && (
              <div className="col-lg-12">
                <ShippingForm />
                {/* <button onClick={() => setActiveForm(null)}>Back</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressesContent;
