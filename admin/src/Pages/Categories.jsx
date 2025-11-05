import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  editCategory,
  updateCategory,
} from "../api/category";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { IoSearch } from "react-icons/io5";
import CategoryForm from "../components/Categories/CategoryForm";
import CategoryTable from "../components/Categories/CategoryTable";
import ViewCategory from "../components/Categories/ViewCategory";
import EditCategoryForm from "../components/Categories/EditCategoryForm";
import ViewSubcategoryTable from "../components/Categories/ViewSubcategoryTable";

const Categories = () => {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch categories
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // ✅ Add category mutation
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category added successfully!");
        queryClient.invalidateQueries(["categories"]);
        setMode("list");
      } else {
        toast.error(res.message || "Failed to add category");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  // ✅ Filter categories by search
  const filteredData = useMemo(() => {
    const all = data?.data || [];
    return all.filter((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);
  const filteredSubcategoryData = useMemo(() => {
    const all = selectedCategory?.subcategories || [];
    return all.filter((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedCategory, searchTerm]);

  // ✅ Columns for table
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "S. No.", cell: ({ row }) => (row.index + 1) },
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
        cell: (info) =>
          <span>{info.getValue().length}</span>
      },
    ],
    []
  );

  // ✅ Update category mutation
  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category updated successfully!");
        queryClient.invalidateQueries(["categories"]);
        setMode("list");
      } else {
        toast.error(res.message || "Failed to update category");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  // ✅ Delete category mutation
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
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddCategory = (formData) => mutation.mutate(formData);

  const handleUpdateCategory = (formData) => {
    if (!selectedCategory?.id) return;
    editMutation.mutate({ id: selectedCategory.id, data: formData });
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setMode("view");
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setMode("edit");
  };

  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="category-pg-head">
              <h3>
                {mode === "add"
                  ? "Add New Category"
                  : mode === "view"
                  ? "View Category"
                  : "All Categories"}
              </h3>
              {mode === "list" && (
                <div className="category-searchadd-flex">
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
                  <button onClick={() => setMode("add")}>+ Add Category</button>
                </div>
              )}
              {(mode === "add" || mode === "view" || mode === "edit") && (
                <button className="back-btn" onClick={() => setMode("list")}>
                  <FaArrowLeftLong /> Back to List
                </button>
              )}
            </div>
          </div>

          {/* Main content */}
          {mode === "add" && (
            <div className="card p-4 shadow-sm border-0 rounded-4">
              <CategoryForm
                onSubmit={handleAddCategory}
                isLoading={mutation.isLoading}
              />
            </div>
          )}

          {mode === "list" && (
            <CategoryTable
              data={filteredData}
              columns={columns}
              isLoading={isLoading}
              onView={handleViewCategory}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          )}
          {mode === "viewSubcategory" && (
            <ViewSubcategoryTable
              // data={filteredData}
              // columns={columns}
              // isLoading={isLoading}
              // onView={handleViewCategory}
              // onEdit={handleEditCategory}
              // onDelete={handleDeleteCategory}
              category={selectedCategory}
            />
          )}
          {mode === "view" && (
            <ViewCategory
              category={selectedCategory}
              onBack={() => setMode("list")}
            />
          )}
          {mode === "edit" && (
            <div className="card p-4 shadow-sm border-0 rounded-4">
              <EditCategoryForm
                category={selectedCategory}
                onSubmit={(formData) =>
                  updateMutation.mutate({
                    id: selectedCategory.id,
                    data: formData,
                  })
                }
                isLoading={updateMutation.isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
