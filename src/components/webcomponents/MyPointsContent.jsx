import React, { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const MyPointsContent = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  // Copy handler
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  // Coupon Data
  const couponData = useMemo(
    () => [
      {
        date: "September 5, 2025",
        value: "$8.40",
        code: "3rhi-73ea-6bc4",
        expire: "-",
        status: "Not used",
      },
      {
        date: "September 10, 2025",
        value: "$5.00",
        code: "9fgh-82df-5xk2",
        expire: "October 10, 2025",
        status: "Used",
      },
    ],
    []
  );

  // Coupon Table Columns
  const couponColumns = useMemo(
    () => [
      { accessorKey: "date", header: "Date of creation" },
      { accessorKey: "value", header: "Value" },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ getValue }) => {
          const code = getValue();
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "6px 12px",
                minWidth: "180px",
                background: "#f9f9f9",
              }}
            >
              <span
                style={{
                  fontWeight: "normal",
                  color: "#999",
                  margin: "0px",
                }}
              >
                {code}
              </span>
              <button
                onClick={() => handleCopy(code)}
                style={{
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: "#007bff",
                  background: "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                {copiedCode === code ? "Copied!" : "Copy"}
              </button>
            </div>
          );
        },
      },
      { accessorKey: "expire", header: "Expire on" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue();
          const color =
            value.toLowerCase() === "used" ? "#dc3545" : "#198754"; // red or green
          return (
            <span
              style={{
                color,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              {value}
            </span>
          );
        },
      },
    ],
    [copiedCode]
  );

  // Points History Data
  const historyData = useMemo(
    () => [
      {
        date: "September 5, 2025",
        reason: "Order Completed",
        order: "#239597",
        points: "+178",
        total: "178 Points",
      },
      {
        date: "September 5, 2025",
        reason: "Created coupon: 3rhi-73ea-6bc4",
        order: "-",
        points: "-84",
        total: "0 Points",
      },
      {
        date: "September 5, 2025",
        reason: "Order Completed",
        order: "#239595",
        points: "+84",
        total: "84 Points",
      },
    ],
    []
  );

  // Points History Columns (with clickable Order No.)
  const historyColumns = useMemo(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "reason", header: "Reason" },
      {
        accessorKey: "order",
        header: "Order No.",
        cell: ({ getValue }) => {
          const orderValue = getValue();
          if (orderValue === "-" || !orderValue.startsWith("#")) {
            return <span style={{ color: "#999" }}>{orderValue}</span>;
          }

          const orderId = orderValue.replace("#", "");
          return (
            <Link
              to={`/account/orders/${orderId}`}
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: 500,
              }}
              onMouseOver={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.target.style.textDecoration = "none")
              }
            >
              {orderValue}
            </Link>
          );
        },
      },
      {
        accessorKey: "points",
        header: "Points",
        cell: ({ row }) => {
          const val = row.original.points;
          const total = row.original.total;
          const color = val.startsWith("+") ? "#198754" : "#dc3545"; // green or red

          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color, fontWeight: 600 }}>{val}</span>
              <small style={{ color: "#aaa", marginTop: "2px" }}>
                {total}
              </small>
            </div>
          );
        },
      },
    ],
    []
  );

  // React Table setup
  const couponTable = useReactTable({
    data: couponData,
    columns: couponColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const historyTable = useReactTable({
    data: historyData,
    columns: historyColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="myppoints-tab-sec">
      <div className="container">
        <div className="row">
          {/* Header Section */}
          <div className="col-lg-12">
            <div className="my-points-head">
              <h2>My Points</h2>
              <div className="row">
                <div className="col-lg-12">
                  <div className="points-ranking d-flex gap-4">
                    <div className="point-box-redeem text-center">
                      <p>Points</p>
                      <h5>to redeem</h5>
                      <h3>178</h3>
                      <h6>worth $17.80</h6>
                      <h4>total collected: 278</h4>
                    </div>
                    <div className="point-box-redeem text-center">
                      <p>My rank</p>
                      <h3>#1</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="col-lg-12">
            <div className="point-tabs-content">
              <div className="manage-points-tabs">
                <Tabs>
                  <TabList>
                    <Tab>Points history</Tab>
                    <Tab>Manage Points</Tab>
                  </TabList>

                  {/* Points History Tab */}
                  <TabPanel>
                    <div className="points-history-tab mt-4">
                      <div className="table-responsive mt-3">
                        <table className="table table-bordered align-middle">
                          <thead className="table-light">
                            {historyTable.getHeaderGroups().map(
                              (headerGroup) => (
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
                              )
                            )}
                          </thead>
                          <tbody>
                            {historyTable.getRowModel().rows.map((row) => (
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
                  </TabPanel>

                  {/* Manage Points Tab */}
                  <TabPanel>
                    <div className="manage-point-tab-content">
                      <h3>Convert Points into a coupon code</h3>
                      <p>
                        Do you want to share your Points? Create a coupon code
                        and share it so it can be used.
                      </p>

                      {/* Convert Points Box */}
                      <div className="convert-points-box">
                        <p>Convert</p>
                        <input
                          type="number"
                          step="1"
                          min="1"
                          max="178"
                          defaultValue="178"
                        />
                        <h6>Points for a coupon value of $17.80</h6>
                        <button>Convert</button>
                      </div>

                      {/* Coupons Table */}
                      <div className="my-coupons-table mt-5">
                        <h4>Your Coupons</h4>
                        <div className="table-responsive mt-3">
                          <table className="table table-bordered align-middle">
                            <thead className="table-light">
                              {couponTable.getHeaderGroups().map(
                                (headerGroup) => (
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
                                )
                              )}
                            </thead>
                            <tbody>
                              {couponTable.getRowModel().rows.map((row) => (
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
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPointsContent;
