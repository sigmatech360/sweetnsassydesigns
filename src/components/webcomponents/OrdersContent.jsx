import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const OrdersContent = () => {
  const [orderItemList, setOrderItemList] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(7);

 const data = useMemo(
    () => [
      { id: "#318278", date: "September 23, 2025", status: "Completed", total: "$0.00 for 1 item", actions: ["View"] },
      { id: "#239597", date: "September 5, 2025", status: "Completed", total: "$202.75 for 33 items", actions: ["View"] },
      { id: "#239595", date: "September 5, 2025", status: "Completed", total: "$95.40 for 15 items", actions: ["View"] },
      { id: "#239506", date: "September 3, 2025", status: "Pending payment", total: "$16.90 for 3 items", actions: ["Pay", "View", "Cancel"] },
      { id: "#239507", date: "September 2, 2025", status: "Completed", total: "$45.00 for 5 items", actions: ["View"] },
      { id: "#239508", date: "September 1, 2025", status: "Pending payment", total: "$78.00 for 12 items", actions: ["Pay", "View"] },
      { id: "#239509", date: "August 30, 2025", status: "Completed", total: "$150.00 for 20 items", actions: ["View"] },
      { id: "#239510", date: "August 29, 2025", status: "Completed", total: "$200.00 for 25 items", actions: ["View"] },
    ],
    []
  );

  // Columns for TanStack Table
  const columns = useMemo(
    () => [
      {
        header: "Order",
        accessorKey: "id",
      },
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "Completed"
                ? "badge bg-success"
                : "badge bg-warning text-dark"
            }
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Total",
        accessorKey: "total",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (info) => (
          <div className="flex ordertable-buttonflex">
            {info.getValue().map((action, i) => (
              <Link key={i} to="#" className={`btn btn-sm ${ action === "Pay" ? "btn-primary" : action === "Cancel"
                    ? "btn-danger" : "btn-outline-secondary" }`}>
                {action}
              </Link>
            ))}
          </div>
        ),
      },
    ],
    []
  );

    const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

   const totalPages = Math.ceil(data.length / pageSize);

  return (
    <>
      {/* <div className="orders-tab-content">
        <div className="container">
          <div className="row">
            {orderItemList === false ? (
              <div className="col-lg-12">
                <div className="no-orders-content">
                  <p>No order has been made yet.</p>
                  <Link to="">Browse Product</Link>
                </div>
              </div>
            ) : (
              <div className="col-lg-12">
                <div className="products-orber-table">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}

        <div className="orders-tab-content">
      <div className="container">
        <div className="row">
          {!orderItemList ? (
            <div className="col-lg-12">
              <div className="no-orders-content">
                <p>No order has been made yet.</p>
                <Link to="">Browse Product</Link>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="products-orber-table">
                <div className="order-table-box">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
                    disabled={pageIndex === 0}
                  >
                    Previous
                  </button>
                  <span>
                    Page {pageIndex + 1} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setPageIndex((old) => Math.min(old + 1, totalPages - 1))}
                    disabled={pageIndex === totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default OrdersContent;
