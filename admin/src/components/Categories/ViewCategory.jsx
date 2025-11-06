// import React from "react";

// const ViewCategory = ({ category }) => {
//   if (!category) return null;

//   return (
//     <div className="card p-4 shadow-sm border-0 rounded-4">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-4 col-md-4">
//             <div className="category-detail-img">
//               {category.thumbnail ? (
//                 <img
//                   src={`${import.meta.env.VITE_API_BASE_URL}${
//                     category.thumbnail
//                   }`}
//                   alt="Category Thumbnail"
//                   className="img-fluid"
//                 />
//               ) : (
//                 <div className="text-muted border rounded-3 p-5">
//                   No Thumbnail
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="col-lg-8 col-md-8">
//             <div className="category-detail-txt">
//               <h5>{category.title}</h5>
//               <p><span>Slug:</span> {category.slug || "N/A"}</p>
//               <p><span>Parent Category:</span>{" "}{category.parent_category || "None"}</p>
//               <p><span>ID:</span> {category.id}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCategory;
