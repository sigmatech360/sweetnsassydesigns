import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";

import balanceCheckIcon from "../../assets/images/balanceCheckIcon.svg";

const Balance = () => {
  return (
    <DefaultLayout>
        <div className="container">
          <div className="row">
            <div className="pwgc-balance-form">
              <img
                src={balanceCheckIcon}
                className="pwgc-balance-form-icon"
                alt=""
              />
              <div className="pwgc-balance-number-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gift Card Number"
                  required
                />
                <button className="pwgc-balance-button blueBtn">Check Balance</button>
              </div>
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default Balance;
