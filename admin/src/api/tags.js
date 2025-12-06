import api from "./axios";

export const getAllTags = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("api/tag/list", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addTag = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("api/tag/store", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteTag = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`api/tag/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editTag = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`api/tag/edit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  

  return response.data;
};

export const updateTag = async ({ id, formData }) => {
  const token = localStorage.getItem("token");

  const response = await api.post(`api/tag/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};