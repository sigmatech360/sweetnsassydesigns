import api from "./axios";

export const getAllAttributes = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("api/attribute", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addAttribute = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("api/attribute/store", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const deleteAttribute = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`api/attribute/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const editAttribute = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`api/attribute/edit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  

  return response.data;
};

export const updateAttribute = async ({ id, formData }) => {
  const token = localStorage.getItem("token");

  const response = await api.post(`api/attribute/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};