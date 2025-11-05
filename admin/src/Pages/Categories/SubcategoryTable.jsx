import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { editCategory } from "../../api/category";
import { Link, useParams } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Table from "../../components/Shared/Table/Table";
import BackButton from "../../components/Shared/BackButton";

const SubcategoryTable = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categoryData = [], isLoading } = useQuery({
    queryKey: [],
    queryFn: () => editCategory(id),
  });
  //   console.log('id',id);

  const filteredData = useMemo(() => {
    const all = categoryData?.data?.subcategories || [];
    return all.filter((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryData, searchTerm]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "S. No.", cell: ({ row }) => row.index + 1 },
      {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: (info) =>
          info.getValue() ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${info.getValue()}`}
              alt="Category Thumbnail"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          ) : (
            <span className="text-muted">No Image</span>
          ),
      },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "slug", header: "Slug" },
      {
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
                {/* <li>
                  <button
                    className="dropdown-item"
                    // onClick={() => onView(row.original)}
                  >
                    <FaEye /> View Child Categories
                  </button>
                </li> */}
                <li>
                  <Link
                    to={`/categories/edit/${row.original.id}`}
                    className="dropdown-item"
                    // onClick={() => onEdit(row.original)}
                  >
                    <FaEdit /> Edit
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => handleDeleteCategory(row.original.id)}
                  >
                    <MdDelete /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <div className="d-flex align-items-center gap-3">
                <BackButton />
                <h5>Categories &gt; {categoryData?.data?.title}</h5>
              </div>
            </div>
          </div>
          <div className="list-table">
            <div className="list-table-header">
              <div className="category-search-box">
                <input
                  type="text"
                  placeholder="Search category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <IoSearch />
                </span>
              </div>
            </div>
            <Table data={filteredData} columns={columns} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubcategoryTable;
