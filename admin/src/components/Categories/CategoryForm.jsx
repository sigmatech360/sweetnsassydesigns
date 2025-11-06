// import React, { useState } from "react";

// const CategoryForm = ({ onSubmit, isLoading }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     parent_category: "",
//     thumbnail: null,
//   });

//   const [preview, setPreview] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "thumbnail" && files.length > 0) {
//       const file = files[0];
//       setFormData({ ...formData, thumbnail: file });
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title) return alert("Please enter a category title");
//     onSubmit(formData);
//   };

//   return (
//     <section className="catetory-form-sec">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="category-input-field">
//                     <label>Category Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       placeholder="Enter category name"
//                       value={formData.title}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="category-input-field">
//                     <label>Parent Category (optional)</label>
//                     <input
//                       type="text"
//                       name="parent_category"
//                       placeholder="Enter parent category ID"
//                       value={formData.parent_category}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-8 col-md-8">
//                   <div className="category-input-field">
//                     <label>Thumbnail Image</label>
//                     <input
//                       type="file"
//                       name="thumbnail"
//                       accept="image/*"
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {preview && (
//                   <div className="col-lg-4 col-md-4">
//                     <div className="category-input-field">
//                       <label>Preview</label>
//                       <div className="category-image-preview">
//                         <img
//                           src={preview}
//                           alt="Preview"
//                           className="img-fluid rounded-3"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div className="col-12 text-end mt-3">
//                   <div className="category-form-btn">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Adding..." : "Add Category"}
//                   </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryForm;
