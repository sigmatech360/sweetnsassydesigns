import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth";
import DefaultLayout from "../../components/DefaultLayout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Password changed successfully!");
        navigate('/login')
        setFormData({
          email: "",
          old_password: "",
          password: "",
          password_confirmation: "",
        });
      } else {
        toast.error(data?.message || "Failed to change password!");
      }
    },
    onError: (error) => {
      const err = error.response?.data;
      if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.old_password || !formData.password || !formData.password_confirmation) {
      toast.warn("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast.warn("Passwords do not match");
      return;
    }

    changePasswordMutation.mutate(formData);
  };

  return (
    <DefaultLayout>
      <section className="change-password-pg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="change-password-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="lost-input-field">
                        <label htmlFor="email" className="form-label">Email <span className="required">*</span></label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="lost-input-field">
                        <label htmlFor="old_password" className="form-label">Old Password <span className="required">*</span></label>
                        <input type={showOld ? "text" : "password"} id="old_password" value={formData.old_password} onChange={handleChange}/>
                        <span className="eye-icon"  onClick={() => setShowOld(!showOld)}>{showOld ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>
                      <div className="lost-input-field">
                        <label htmlFor="password" className="form-label">New Password <span className="required">*</span></label>
                        <input type={showNew ? "text" : "password"} id="password" value={formData.password} onChange={handleChange}/>
                        <span className="eye-icon"  onClick={() => setShowNew(!showNew)}>{showNew ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>
                      <div className="lost-input-field">
                        <label htmlFor="password_confirmation" className="form-label">Confirm Password <span className="required">*</span></label>
                        <input type={showConfirm ? "text" : "password"}  id="password_confirmation" value={formData.password_confirmation} onChange={handleChange}/>
                         <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>
                      <button type="submit" disabled={changePasswordMutation.isLoading}>
                        {changePasswordMutation.isLoading ? "Saving..." : "Save changes"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ChangePassword;
