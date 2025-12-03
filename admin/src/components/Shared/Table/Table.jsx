import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React, { useState } from "react";
import TablePagination from "./TablePagination";

const Table = ({ data, columns }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });
  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     pagination,
  //   },
  //   manualPagination: true, // ⭐ server mode ON
  //   pageCount: Math.ceil(totalItems / pagination.pageSize),
  //   onPaginationChange: setPagination,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // });
  return (
    <div className="table-content">
      <table className="table align-middle">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
              <td
                colSpan={columns.length + 1}
                className="text-center text-muted"
              >
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TablePagination table={table} />
    </div>
  );
};

export default Table;
