import React from "react";

const TablePagination = ({ table }) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getCoreRowModel().rows.length;

  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  const totalPages = Math.ceil(totalRows / pageSize);
  let pages = [];
  // console.log('totalPages',totalPages);
  for (let i = 1; i <= totalPages; i++) {
    // console.log('i',i);
    pages.push(i);
  }

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
                } `}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <a href="#" className="page-link">
                  Previous
                </a>
              </li>
              {pages.map((pageNum, idx) => (
                <li
                  key={idx}
                  className={`paginate_button page-item ${
                    pageIndex + 1 === pageNum ? "active" : ""
                  }`}
                  onClick={() => table.setPageIndex(pageNum - 1)}
                >
                  <a
                    href="#"
                    aria-controls="proposalList"
                    data-dt-idx={pageNum}
                    tabIndex="0"
                    className="page-link"
                  >
                    {pageNum}
                  </a>
                </li>
              ))}

              {/* <li className="paginate_button page-item active">
                <a
                  href="#"
                  aria-controls="proposalList"
                  data-dt-idx="0"
                  tabIndex="0"
                  className="page-link"
                >
                  {table.getState().pagination.pageIndex + 1}
                </a>
              </li> */}
              <li
                className={`paginate_button page-item next ${
                  !table.getCanNextPage() ? "disabled" : ""
                }`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <a href="#" className="page-link">
                  Next
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
