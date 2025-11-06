import api from "./axios";

export const getAllProducts = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("api/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addProduct = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("api/product/store", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`api/product/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const editProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`api/product/edit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  

  return response.data;
};

export const updateProduct = async ({ id, formData }) => {
  const token = localStorage.getItem("token");

  const response = await api.post(`api/product/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};