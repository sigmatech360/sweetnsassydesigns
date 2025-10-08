import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const DownloadsContent = () => {
  const [downloadList, setDownloadList] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(7); 

  const data = useMemo(
    () => [
      { product: "Galactic Unicorn", downloads: "∞", expires: "Never", file: "SSD Galactic Unicorn - 4 HOOP SIZES" },
      { product: "Ladybug Unicorn", downloads: "∞", expires: "Never", file: "SSD Ladybug Unicorn - 4 HOOP SIZES" },
      { product: "Cherry Blossom Unicorn", downloads: "∞", expires: "Never", file: "SSD Cherry Blossom Unicorn - 4 HOOP SIZES" },
      { product: "Valentine Unicorn", downloads: "∞", expires: "Never", file: "SSD Valentine Unicorn - 4 HOOP SIZES" },
      { product: "Conversation Hearts Mug Rug Set", downloads: "∞", expires: "Never", file: "Conversation Hearts Mug Rug Set - 3 HOOP SIZES" },
      { product: "Curly Hair Chef Boy", downloads: "∞", expires: "Never", file: "SSD Curly Hair Chef Boy - 4 HOOP SIZES" },
      { product: "Curly Hair Chef Girl", downloads: "∞", expires: "Never", file: "SSD Curly Hair Chef Girl - 4 HOOP SIZES" },
      { product: "Disco Balls", downloads: "∞", expires: "Never", file: "SSD Disco Balls Multi-Size Pack" },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { header: "Product", accessorKey: "product" },
      { header: "Downloads remaining", accessorKey: "downloads" },
      { header: "Expires", accessorKey: "expires" },
      {
        header: "Download",
        accessorKey: "file",
        cell: (info) => ( 
          <Link to="#" className="btn btn-sm download-file-btn">
            {info.getValue()}
          </Link>
        ),
      },
    ],
    []
  );

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="downloads-tab-content">
      <div className="container">
        <div className="row">
          {!downloadList ? (
            <div className="col-lg-12">
              <div className="no-orders-content">
                <p>No downloads available yet.</p>
                <Link to="">Browse Product</Link>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="products-download-table">
                <div className="downlaod-table-box">
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
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-primary" onClick={() => setPageIndex((old) => Math.max(old - 1, 0))} disabled={pageIndex === 0}>Previous</button>
                  <span>Page {pageIndex + 1} of {totalPages}</span>
                  <button className="btn btn-outline-primary" onClick={() => setPageIndex((old) => Math.min(old + 1, totalPages - 1))} disabled={pageIndex === totalPages - 1}> Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadsContent;
