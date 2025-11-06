// import React from "react";
// import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
// import { BiDotsVerticalRounded } from "react-icons/bi";
// import { FaEye } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import Table from "../Shared/Table/Table";

// const CategoryTable = ({ data, columns, isLoading, onView, onEdit, onDelete }) => {
//   const actionColumn = {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <div className="category-action-dropdown position-relative">
//         <div className="action-dropdown dropdown">
//           <button
//             className="btn btn-link text-dark p-0 border-0"
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <BiDotsVerticalRounded size={20} />
//           </button>
//           <ul className="dropdown-menu dropdown-menu-end shadow-sm">
//             <li><button className="dropdown-item" onClick={() => onView(row.original)}><FaEye /> View Child Categories</button></li>
//             <li><button className="dropdown-item" onClick={() => onEdit(row.original)}><FaEdit /> Edit</button></li>
//             <li><button className="dropdown-item text-danger" onClick={() => onDelete(row.original.id)}><MdDelete /> Delete</button></li>
//           </ul>
//         </div>
//       </div>
//     ),
//   };

  

//   if (isLoading) return <div className="category-loading"><p>Loading categories...</p></div>;

//   return (
//     <Table data={data} columns={columns} />
//   );
// };

// export default CategoryTable;
