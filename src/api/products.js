import api from "./axios";

export const getAllProducts = async () => {
  const response = await api.get("api/products");
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get("api/products/feature");
  return response.data;
};



// export const addProject = async (formData) => {
  

//   const response = await api.post("/project/store", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// export const deleteProject = async (id) => {
//   const token = localStorage.getItem("token");
//   const response = await api.delete(`/project/delete/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const viewProject = async (id) => {

//   const response = await api.get(`/project/view/${id}`);
//   // console.log('category' , response?.data);
  

//   return response.data;
// };

// export const editProject = async (id) => {

//   const response = await api.get(`/project/edit/${id}`);
//   // console.log('category' , response?.data);
  

//   return response.data;
// };

// export const updateProject = async ({ id, formData }) => {
//   const response = await api.post(`/project/update/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// export const updateProjectStatus = async ({ id, formData }) => {
//   const response = await api.post(`/project/status/update/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };




