import api from "./axios";

export const loginUser = async (data) => {
  const response = await api.post("api/login", data);
  return response.data;
};

export const registerUser = async ({ email }) => {
  const response = await api.post("api/register", { email });
  return response.data;
};

export const forgotPassword = async ({ emailOrUsername }) => {
  const response = await api.post("api/forgot-password", {
    email: emailOrUsername, 
  });
  return response.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const response = await api.post("api/otp-verification", { email, otp });
  return response.data;
};

export const resetPassword = async ({ email, password, password_confirmation  }) => {
  const response = await api.post("api/reset-password", { email, password, password_confirmation });
  return response.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("token");
  const response = await api.post("api/logout", {}, { headers: {  Authorization: `Bearer ${token}`, },});
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("api/profile/edit", { headers: { Authorization: `Bearer ${token}` },});
  return response.data;
};

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post("api/profile/update", data, { headers: { Authorization: `Bearer ${token}` },});
  return response.data;
};

export const changePassword = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post("api/change-password", data, { headers: { Authorization: `Bearer ${token}`,},});
  return response.data;
};

