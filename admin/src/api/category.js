import api from "./axios";

export const getAllCategories = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("api/category", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addCategory = async (formData) => {
  const token = localStorage.getItem("token");
  

  const response = await api.post("api/category/store", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`api/category/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const editCategory = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`api/category/edit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log('category' , response?.data);
  

  return response.data;
};

export const updateCategory = async ({ id, formData }) => {
  const token = localStorage.getItem("token");

  const response = await api.post(`api/category/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


