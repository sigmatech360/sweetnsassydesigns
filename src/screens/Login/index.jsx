import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const { login, register } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(registerEmail);
  };



  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="authForms">
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
                  <Tab eventKey="login" title="Login">
                    <form className="authForm" onSubmit={handleLogin}>
                      <div className="authFormDiv">
                        <label htmlFor="inputUserOrEmail" className="form-label" >
                          Username or email address{" "} <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" id="inputUserOrEmail" value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)} required />
                      </div>
                      <div className="authFormDiv">
                        <label htmlFor="inputPassword" className="form-label">
                          Password <span className="required">*</span>
                        </label>
                        <input type="password" className="form-control" id="inputPassword" value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)} required />
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rememberMe"/>
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                      </div>
                      {/* <p>A link t</p> */}
                      <button className="authFormBtn">Login</button>
                      <p className="text-center mt-3">
                        <Link to="">Lost your password?</Link>
                      </p>
                    </form>
                  </Tab>
                  <Tab eventKey="register" title="Register">
                    <form className="authForm" onSubmit={handleRegister}>
                      <div className="authFormDiv">
                        <label htmlFor="inputEmail" className="form-label">
                          Email address <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" id="inputEmail" value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)} required />
                      </div>
                      <p>
                        A link to set a new password will be sent to your email
                        address.
                      </p>
                      <p> Your personal data will be used to support your
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
