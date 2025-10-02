import React from "react";

const BillingForm = () => {
  return (
    <>
      <div className="billing-address-formcontent">
        <div className="container">
          <div className="col-lg-12">
            <div className="billing-address-form">
              <form action="">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="billing-form-head">
                      <h2>Billing address</h2>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Email address <span className="colorBlue">*</span>
                      </label>
                      <input type="email" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="billing-input-field">
                      <label htmlFor="">First name <span className="colorBlue">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="billing-input-field">
                      <label htmlFor="">Last name <span className="colorBlue">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Country / Region <span className="colorBlue">*</span>
                      </label>
                      <input type="email" name="" id="" />
                    </div>
                  </div>
                   <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Street address <span className="colorBlue">*</span></label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                   <div className="col-lg-12">
                    <div className="billing-input-field">
                      <input type="text" name="" id="" placeholder="Apartment, suite, unit, etc. (optional)"/>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Town / City <span className="colorBlue">*</span></label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Department <span className="colorBlue">*</span></label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Postcode / ZIP <span className="colorBlue">*</span></label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                   <div className="col-lg-12">
                    <div className="billing-input-field">
                      <label htmlFor="">Phone (optional) <span className="colorBlue">*</span></label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-save-btn">
                      <button>Save Address</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingForm;
