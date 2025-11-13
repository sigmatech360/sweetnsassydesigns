import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sidebarData } from "../../data/Data";

const Login = () => {
  const { user, login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const { user, loading } = useAuth();
  const location = useLocation();

  const publicRoutes = ["/login", "/forgot-password"];

  if (user && publicRoutes.includes(location.pathname)) {
    return <Navigate to={sidebarData[0].path} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!email || !password) {
    //   alert("Please enter both email and password");
    //   return;
    // }

    login({ email, password }); // ✅ Uses same login API
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="authForms">
              <h4 className="text-center mb-4">Admin Login</h4>
              <form className="authForm" onSubmit={handleSubmit}>
                {/* Email / Username */}
                <div className="authFormDiv mb-3">
                  <label htmlFor="email" className="form-label">
                    Username or email address{" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="authFormDiv">
                  <label htmlFor="password" className="form-label">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="authFormBtn"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </button>

                {/* Forgot Password */}
                <p className="text-center mt-3 mb-0">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
