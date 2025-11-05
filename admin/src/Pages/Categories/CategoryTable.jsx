import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { deleteCategory, getAllCategories } from "../../api/category";
import { toast } from "react-toastify";
import Table from "../../components/Shared/Table/Table";
import { IoSearch } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { confirmDelete } from "../../components/Shared/confirmDelete";

const CategoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //   const [categoriesData, setCategoriesData] = useState([]);
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // ✅ Fetch categories
  const { data: categoriesData = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // ✅ Filter categories by search
  const filteredData = useMemo(() => {
    const all = categoriesData?.data || [];
    return all.filter((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoriesData, searchTerm]);

  // ✅ Columns for table
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
        accessorKey: "subcategories",
        header: "Total Child Categories",
        cell: (info) => <span>{info.getValue().length}</span>,
      },
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
                {row.original.subcategories.length > 0 && (

                <li>
                  <Link
                  to={`/categories/subcategory/list/${row.original.id}`}
                    className="dropdown-item"
                    // onClick={() => onView(row.original)}
                  >
                    <FaEye /> View Child Categories
                  </Link>
                </li>
                )}
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

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category deleted successfully!");
        queryClient.invalidateQueries(["categories"]); // refresh list
      } else {
        toast.error(res.message || "Failed to delete category");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const handleDeleteCategory = (id) => {
    // if (window.confirm("Are you sure you want to delete this category?")) {
    // console.log('deleting id', id);
    confirmDelete(id, "Are you sure you want to delete this category?").then((result) => {
      if (result.confirmed) {
        deleteMutation.mutate(id);
      }
    });
    
    //   deleteMutation.mutate(id);
    //   setShowDeleteModal(false);
    // }
  };

  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <h4>Categories</h4>
              <div className="category-searchadd-flex">
                {/* <div className="category-search-box">
                  <input
                    type="text"
                    placeholder="Search category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>
                    <IoSearch />
                  </span>
                </div> */}
                <Link to={`/categories/add`} className="btn-primary">
                  + Add Category
                </Link>
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

export default CategoryTable;
