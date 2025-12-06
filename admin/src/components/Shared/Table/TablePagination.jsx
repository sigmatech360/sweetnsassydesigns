import React from "react";

const TablePagination = ({ table }) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getCoreRowModel().rows.length;

  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  const totalPages = Math.ceil(totalRows / pageSize);

  // ✅ Calculate visible pages (max 5)
  const visiblePages = () => {
    const maxVisible = 3;
    let start = Math.max(1, pageIndex + 1 - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = visiblePages();

  return (
    <div className="row gy-2 p-3">
      <div className="col-sm-12 col-md-5 p-0">
        <div
          className="dataTables_info text-lg-start text-center"
          id="proposalList_info"
          role="status"
          aria-live="polite"
        >{`Showing ${startRow} to ${endRow} of ${totalRows} entries`}</div>
      </div>

      <div className="col-sm-12 col-md-7 p-0">
        {totalPages > 1 && (
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="proposalList_paginate"
          >
            <ul className="pagination mb-0 justify-content-md-end justify-content-center">
              <li
                className={`paginate_button page-item previous ${
                  !table.getCanPreviousPage() ? "disabled" : ""
                }`}
                onClick={() => table.previousPage()}
              >
                <span className="page-link">
                  Prev
                </span>
              </li>

              {pages.map((pageNum) => (
                <li
                  key={pageNum}
                  className={`paginate_button page-item ${
                    pageIndex + 1 === pageNum ? "active" : ""
                  }`}
                  onClick={() => table.setPageIndex(pageNum - 1)}
                >
                  <span className="page-link">
                    {pageNum}
                  </span>
                </li>
              ))}

              <li
                className={`paginate_button page-item next ${
                  !table.getCanNextPage() ? "disabled" : ""
                }`}
                onClick={() => table.nextPage()}
              >
                <span className="page-link">
                  Next
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
