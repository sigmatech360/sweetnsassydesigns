import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const AccountDetailsContent = () => {
 const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const queryClient = useQueryClient();

  // GET PROFILE DATA
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // Populate form fields jab data aaye
  useEffect(() => {
    if (data?.success && data?.data) {
      setFormData({
        first_name: data.data.first_name || "",
        last_name: data.data.last_name || "",
        username: data.data.username || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    }
  }, [data]);

  // UPDATE PROFILE MUTATION
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully!");
        queryClient.invalidateQueries(["profile"]);
      } else {
        toast.error(res?.message || "Failed to update profile!");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
    };

    if (formData.current_password || formData.new_password || formData.confirm_password) {
      payload.old_password = formData.current_password;
      payload.password = formData.new_password;
      payload.password_confirmation = formData.confirm_password;
    }

    updateMutation.mutate(payload);
  };

  if (isLoading)
    return (
      <div className="account-details-notice">
        <p>Loading profile...</p>{" "}
      </div>
    );

  return (
    <div className="account-details-tab">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="passowrd-notify">
            {data?.data?.password_changed === "0" && (
              <h6>
                Your account with Sweet N Sassy Designs is using a temporary
                password. We emailed you a link to change your password.
              </h6>
            )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="account-detail-tab-form">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="account-input-field">
                      <label>
                        First Name <span className="colorBlue">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="account-input-field">
                      <label>
                        Last Name <span className="colorBlue">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="account-input-field">
                      <label>
                        Display Name <span className="colorBlue">*</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        disabled
                      />
                      <span>
                        This will be how your name will be displayed in the
                        account section and in reviews
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <label>
                        Email address <span className="colorBlue">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Password change fields */}
                  <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <p>Password change</p>
                      <label>Current password</label>
                      <div className="password-field">
                        <input
                            type={show.current ? "text" : "password"}
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleChange}
                        />
                        <span className="eye-icon" onClick={() => setShow((s) => ({ ...s, current: !s.current }))}>
                             {show.current ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <label>New password</label>
                      <div className="password-field">
                        <input
                           type={show.new ? "text" : "password"}
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                        />
                        <span className="eye-icon" onClick={() => setShow((s) => ({ ...s, new: !s.new }))}>
                          {show.new ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <label>Confirm new password</label>
                      <div className="password-field">
                        <input
                            type={show.confirm ? "text" : "password"}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                        <span className="eye-icon" onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}>
                          {show.confirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="account-detail-savebtn">
                      <button type="submit" disabled={updateMutation.isLoading}>
                         {updateMutation.isLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsContent;
