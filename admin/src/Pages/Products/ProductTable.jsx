import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
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
import ScreenLoader from "../../components/Shared/ScreenLoader/ScreenLoader";
import { formatDate } from "../../utils/dateFormat";
import { deleteProduct, getAllProducts } from "../../api/product";

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch categories
  const {
    data: productsData = [],
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnMount: true,
  });

  // ✅ Filter categories by search
  const filteredData = useMemo(() => {
    console.log("productsData", productsData);

    const all = productsData?.data || [];
    return all.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productsData, searchTerm]);

  // ✅ Columns for table
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "", cell: ({ row }) => row.index + 1 },
      {
        accessorKey: "image",
        header: "Image",
        cell: (info) =>
          info.getValue() ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${info.getValue()}`}
              alt="Product Image"
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
      { accessorKey: "title", header: "Title", cell: (info) => <span className="text-primary fw-medium">{info.getValue()}</span> },
      { accessorKey: "sku", header: "SKU" },
      {
        accessorKey: "regular_price",
        header: "Price",
        cell: (info) => <span>${info.getValue()}</span>,
      },
      {
        accessorKey: "in_stock",
        header: "Stock",
        cell: (info) => {
          return info.getValue() == "0" ? (
            <span className="text-danger fw-medium text-nowrap">Out of Stock</span>
          ) : (
            <span className="text-success fw-medium text-nowrap">In Stock</span>
          );
        },
      },
      {
        accessorKey: "categories",
        header: "Categories",
        cell: (info) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => <span>Published{info.getValue()}</span>,
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
                <li>
                  <Link
                    to={`/product/edit/${row.original.id}`}
                    className="dropdown-item"
                    // onClick={() => onEdit(row.original)}
                  >
                    <FaEdit /> Edit
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => handleDelete(row.original.id)}
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
    mutationFn: deleteProduct,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Product deleted successfully!");
        queryClient.invalidateQueries(["attribute"]); // refresh list
      } else {
        toast.error(res.message || "Failed to delete category");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const handleDelete = (id) => {
    // if (window.confirm("Are you sure you want to delete this category?")) {
    // console.log('deleting id', id);
    confirmDelete(id, "Are you sure you want to delete this attribute?").then(
      (result) => {
        if (result.confirmed) {
          deleteMutation.mutate(id);
        }
      }
    );

    //   deleteMutation.mutate(id);
    //   setShowDeleteModal(false);
    // }
  };

  if (isPending) {
    return <ScreenLoader />;
  }

  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <h4>Products</h4>
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
                <Link to={`/product/add`} className="btn-primary">
                  + Add Product
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
            <Table
              data={filteredData}
              totalItems={productsData?.meta?.total}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTable;
