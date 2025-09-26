import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

const Login = () => {
  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <nav aria-label="breadcrumb" className="themeBreadCrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/login">My account</Link>
                  </li>
                  {/* <li className="breadcrumb-item active" aria-current="page">
                  Data
                </li> */}
                </ol>
              </nav>
            </div>
            <div className="col-lg-6">
              <div className="authForms">
                <Tabs
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="login" title="Login">
                    <form className="authForm">
                      <div className="authFormDiv">
                        <label
                          htmlFor="inputUserOrEmail"
                          className="form-label"
                        >
                          Username or email address{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputUserOrEmail"
                          required
                        />
                      </div>
                      <div className="authFormDiv">
                        <label htmlFor="inputPassword" className="form-label">
                          Password <span className="required">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword"
                          required
                        />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      {/* <p>A link t</p> */}
                      <button className="authFormBtn">Login</button>
                      <p className="text-center mt-3">
                        <Link to="">Lost your password?</Link>
                      </p>
                    </form>
                  </Tab>
                  <Tab eventKey="register" title="Register">
                    <form className="authForm">
                      <div className="authFormDiv">
                        <label htmlFor="inputEmail" className="form-label">
                          Email address <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputEmail"
                          required
                        />
                      </div>
                      <p>
                        A link to set a new password will be sent to your email
                        address.
                      </p>
                      <p>
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our{" "}
                        <a href="javascript:;">privacy policy.</a>
                      </p>
                      <button className="authFormBtn">Register</button>
                    </form>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Login;
