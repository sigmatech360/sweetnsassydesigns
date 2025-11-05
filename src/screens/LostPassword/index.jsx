import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DefaultLayout from "../../components/DefaultLayout";
import { forgotPassword, verifyOtp, resetPassword } from "../../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LostPassword = () => {
  const [step, setStep] = useState("email"); // "email" | "otp" | "reset"
  const [message, setMessage] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // STEP 1 — Send OTP
  const sendOtpMutation = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => setMessage("Please wait... sending OTP to your email."),
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

  // STEP 2 — Verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onMutate: () => setMessage("Verifying OTP..."),
    onSuccess: (data) => {
      if (data?.success) {
        setMessage("OTP verified successfully! Now set a new password.");
        setStep("reset");
      } else {
        setMessage(data?.message || "Invalid OTP. Try again.");
      }
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "OTP verification failed.");
    },
  });

  // STEP 3 — Reset Password
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onMutate: () => setMessage("Saving new password..."),
    onSuccess: (data) => {
      if (data?.success) {
        setMessage("Password changed successfully!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage(data?.message || "Failed to reset password.");
      }
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Reset password failed.");
    },
  });

  //  Handlers
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailOrUsername.trim()) return setMessage("Enter your email first!");
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
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pasteData)) {
      const digits = pasteData.split("").slice(0, 6); 
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
    if (newPassword !== confirmPassword)
      return setMessage("Passwords do not match!");
    resetPasswordMutation.mutate({
      email: emailOrUsername,
      password: newPassword,
      password_confirmation: confirmPassword,
    });
  };

  return (
    <DefaultLayout>
      <section className="lost-password-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                <div className="lost-password-form">
                    {message && <h6>{message}</h6>}
                </div>
              {/* STEP 1 — Send OTP */}
              {step === "email" && (
                <div className="lost-password-form">
                  <p>
                    Lost your password? Please enter your username or email
                    address. You will receive a code to reset your password.
                  </p>
                  <div className="row">
                    <div className="col-lg-6">
                      <form onSubmit={handleEmailSubmit}>
                        <div className="lost-input-field">
                          <label
                            htmlFor="emailOrUsername"
                            className="form-label"
                          >
                            Username or Email{" "}
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="emailOrUsername"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            placeholder="Enter your email or username"
                          />
                          <button
                            type="submit"
                            disabled={sendOtpMutation.isLoading}
                            className="authFormBtn"
                          >
                            {sendOtpMutation.isLoading
                              ? "Sending OTP..."
                              : "Reset Password"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — OTP Verification */}
              {step === "otp" && (
                <div className="otp-verification-form">
                  <p>Enter the 6-digit OTP sent to your email.</p>
                  <div className="row">
                    <div className="col-lg-6">
                      <form onSubmit={handleOtpVerify}>
                        <div
                          className="otp-input-group"
                          style={{ display: "flex", gap: "10px" }}
                        >
                          {otpDigits.map((digit, i) => (
                            <input
                              key={i}
                              type="text"
                              maxLength="1"
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(i, e.target.value)
                              }
                              onPaste={(e) => handleOtpPaste(e)}
                              className="otp-box"
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
                          disabled={verifyOtpMutation.isLoading}
                          className="authFormBtn mt-3"
                        >
                          {verifyOtpMutation.isLoading
                            ? "Verifying..."
                            : "Verify OTP"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — Reset Password */}
              {step === "reset" && (
                <div className="change-password-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <form onSubmit={handleResetPassword}>
                        <div className="lost-input-field">
                          <label htmlFor="newpassword" className="form-label">
                            New Password <span className="required">*</span>
                          </label>
                          <input
                            type={showNew ? "text" : "password"}
                            id="newpassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                          />
                          <span
                            className="eye-icon"
                            onClick={() => setShowNew(!showNew)}
                          >
                            {showNew ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>

                        <div className="lost-input-field">
                          <label
                            htmlFor="confirmpassword"
                            className="form-label"
                          >
                            Confirm Password <span className="required">*</span>
                          </label>
                          <input
                            type={showConfirm ? "text" : "password"}
                            id="confirmpassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
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
                          disabled={resetPasswordMutation.isLoading}
                          className="authFormBtn"
                        >
                          {resetPasswordMutation.isLoading
                            ? "Saving..."
                            : "Save Changes"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default LostPassword;
