import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, verifyOtp, resetPassword } from "../../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState("email"); // "email" | "otp" | "reset"
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 1️⃣ Send OTP
  const sendOtpMutation = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => setMessage("Sending OTP to your email..."),
    onSuccess: (data) => {
      if (data?.success) {
        setMessage("OTP sent successfully! Please check your email.");
        setStep("otp");
      } else {
        setMessage(data?.message || "Failed to send OTP.");
      }
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Something went wrong.");
    },
  });

  // 2️⃣ Verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onMutate: () => setMessage("Verifying OTP..."),
    onSuccess: (data) => {
      if (data?.success) {
        setMessage("OTP verified successfully! Now set your new password.");
        setStep("reset");
      } else {
        setMessage(data?.message || "Invalid OTP. Try again.");
      }
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "OTP verification failed.");
    },
  });

  // 3️⃣ Reset Password
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onMutate: () => setMessage("Saving new password..."),
    onSuccess: (data) => {
      if (data?.success) {
        setMessage("Password changed successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMessage(data?.message || "Failed to reset password.");
      }
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Reset password failed.");
    },
  });

  // Handlers
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailOrUsername.trim()) {
      setMessage("Enter your email or username first!");
      return;
    }
    sendOtpMutation.mutate({ emailOrUsername });
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpDigits];
      newOtp[index] = value;
      setOtpDigits(newOtp);
      if (value && index < otpDigits.length - 1) {
        const next = document.querySelectorAll(".otp-box")[index + 1];
        if (next) next.focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(data)) {
      const digits = data.split("").slice(0, 6);
      const newOtp = [...otpDigits];
      digits.forEach((d, i) => {
        if (i < newOtp.length) newOtp[i] = d;
      });
      setOtpDigits(newOtp);
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length < 4) return setMessage("Please enter complete OTP!");
    verifyOtpMutation.mutate({ email: emailOrUsername, otp });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    resetPasswordMutation.mutate({
      email: emailOrUsername,
      password: newPassword,
      password_confirmation: confirmPassword,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="authForms">
              <h4 className="text-center mb-4">
                {step === "email"
                  ? "Forgot Password"
                  : step === "otp"
                  ? "Verify OTP"
                  : "Reset Password"}
              </h4>

              {message && (
                <div
                  className="admin-forgot-msg"
                  style={{ fontSize: "14px" }}
                >
                 <h6>{message}</h6>
                </div>
              )}

              {/* STEP 1 — EMAIL INPUT */}
              {step === "email" && (
                <form className="authForm" onSubmit={handleEmailSubmit}>
                  <div className="authFormDiv mb-3">
                    <label htmlFor="emailOrUsername" className="form-label">
                      Username or Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="emailOrUsername"
                      className="form-control"
                      placeholder="Enter your email or username"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="authFormBtn"
                    disabled={sendOtpMutation.isLoading}
                  >
                    {sendOtpMutation.isLoading
                      ? "Sending OTP..."
                      : "Send Verification Code"}
                  </button>
                </form>
              )}

              {/* STEP 2 — OTP VERIFICATION */}
              {step === "otp" && (
                <form className="authForm" onSubmit={handleOtpVerify}>
                  <p className="text-center mb-3">
                    Enter the 6-digit OTP sent to your email.
                  </p>
                  <div
                    className="d-flex justify-content-center mb-3"
                    style={{ gap: "10px" }}
                  >
                    {otpDigits.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onPaste={handleOtpPaste}
                        className="otp-box text-center"
                        style={{
                          width: "40px",
                          height: "45px",
                          textAlign: "center",
                          fontSize: "18px",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="authFormBtn"
                    disabled={verifyOtpMutation.isLoading}
                  >
                    {verifyOtpMutation.isLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}

              {/* STEP 3 — RESET PASSWORD */}
              {step === "reset" && (
                <form className="authForm" onSubmit={handleResetPassword}>
                  <div className="authFormDiv mb-3 position-relative">
                    <label htmlFor="newPassword" className="form-label">
                      New Password <span className="required">*</span>
                    </label>
                    <input
                      type={showNew ? "text" : "password"}
                      id="newPassword"
                      className="form-control"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <div className="authFormDiv mb-3 position-relative">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password <span className="required">*</span>
                    </label>
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="authFormBtn"
                    disabled={resetPasswordMutation.isLoading}
                  >
                    {resetPasswordMutation.isLoading
                      ? "Saving..."
                      : "Save New Password"}
                  </button>
                </form>
              )}

              <div className="back-login">
                <Link to="/login">Back to login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
