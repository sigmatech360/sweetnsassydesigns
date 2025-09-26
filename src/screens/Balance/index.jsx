import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";

import balanceCheckIcon from "../../assets/images/balanceCheckIcon.svg";

const Balance = () => {
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
                    <Link to="/balance">Balance</Link>
                  </li>
                </ol>
              </nav>
            </div>

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
      </main>
    </DefaultLayout>
  );
};

export default Balance;
