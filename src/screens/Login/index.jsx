import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, register, isLoggingIn, isRegistering } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [showNew, setShowNew] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email: loginEmail, password: loginPassword });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ email: registerEmail });
      setActiveTab("login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="authForms">
                <Tabs defaultActiveKey="login" id="auth-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                  {/* LOGIN TAB */}
                  <Tab eventKey="login" title="Login">
                    <form className="authForm" onSubmit={handleLogin}>
                      <div className="authFormDiv">
                        <label htmlFor="inputUserOrEmail" className="form-label">
                          Username or email address <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" id="inputUserOrEmail" value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)} required/>
                      </div>

                      <div className="authFormDiv">
                        <label htmlFor="inputPassword" className="form-label">
                          Password <span className="required">*</span>
                        </label>
                        <input
                          type={showNew ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <span className="eye-icon"  onClick={() => setShowNew(!showNew)}>{showNew ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>

                      <button className="authFormBtn" disabled={isLoggingIn}>
                        {isLoggingIn ? "Logging in..." : "Login"}
                      </button>

                      <p className="text-center mt-3">
                        <Link to="/lost-password">Lost your password?</Link>
                      </p>
                    </form>
                  </Tab>

                  {/* REGISTER TAB */}
                  <Tab eventKey="register" title="Register">
                    <form className="authForm" onSubmit={handleRegister}>
                      <div className="authFormDiv">
                        <label htmlFor="inputEmail" className="form-label">
                          Email address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>

                      <p>
                        A link to set a new password will be sent to your email address.
                      </p>
                      <p>
                        Your personal data will be used to support your experience throughout this website,
                        to manage access to your account, and for other purposes described in our{" "}
                        <a href="javascript:;">privacy policy</a>.
                      </p>

                      <button className="authFormBtn" disabled={isRegistering}>
                        {isRegistering ? "Sending Email..." : "Register"}
                      </button>
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
