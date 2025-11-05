import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CategoryTable = ({ data, columns, isLoading, onView, onEdit, onDelete }) => {
  const actionColumn = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="category-action-dropdown position-relative">
        <div className="action-dropdown dropdown">
          <button
            className="btn btn-link text-dark p-0 border-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <BiDotsVerticalRounded size={20} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            <li><button className="dropdown-item" onClick={() => onView(row.original)}><FaEye /> View</button></li>
            <li><button className="dropdown-item" onClick={() => onEdit(row.original)}><FaEdit /> Edit</button></li>
            <li><button className="dropdown-item text-danger" onClick={() => onDelete(row.original.id)}><MdDelete /> Delete</button></li>
          </ul>
        </div>
      </div>
    ),
  };

  const table = useReactTable({
    data: data || [],
    columns: [...columns, actionColumn],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="category-loading"><p>Loading categories...</p></div>;

  return (
    <div className="category-list-table">
      <table className="table align-middle">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center text-muted">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
