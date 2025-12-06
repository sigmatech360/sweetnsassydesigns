import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { addTag, deleteTag, getAllTags, updateTag } from "../../api/tags";
import Table from "../../components/Shared/Table/Table";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { formatDate } from "../../utils/dateFormat";
import { toast } from "react-toastify";
import { confirmDelete } from "../../components/Shared/confirmDelete";
import { Modal } from "react-bootstrap";

const Tags = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleClose = () => {
    setShowModal(false)
    setEditFormData({
      title:"",
      slug : ""
    })
  };

  const {
    data: tagssData = [],
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
    refetchOnMount: true,
  });

  const filteredData = useMemo(() => {
    const all = tagssData?.data || [];
    return all.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tagssData, searchTerm]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "S. No.", cell: ({ row }) => row.index + 1 },
      // {
      //   accessorKey: "thumbnail",
      //   header: "Thumbnail",
      //   cell: (info) =>
      //     info.getValue() ? (
      //       <img
      //         src={`${import.meta.env.VITE_API_BASE_URL}${info.getValue()}`}
      //         alt="Category Thumbnail"
      //         style={{
      //           width: "50px",
      //           height: "50px",
      //           borderRadius: "6px",
      //           objectFit: "cover",
      //         }}
      //       />
      //     ) : (
      //       <span className="text-muted">No Image</span>
      //     ),
      // },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "slug", header: "Slug" },
      {
        accessorKey: "updated_at",
        header: "Last Updated",
        cell: (info) => <span>{formatDate(info.getValue())}</span>,
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
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      console.log('id', row.original.id);
                      
                      setEditFormData({
                        title: row.original.title,
                        slug: row.original.slug,
                      });
                      setShowModal(true);
                      setSelectedId(row.original.id)
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
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
    mutationFn: deleteTag,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Product deleted successfully!");
        queryClient.invalidateQueries(["tags"]); // refresh list
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
    confirmDelete(id, "Are you sure you want to delete this tag?").then(
      (result) => {
        if (result.confirmed) {
          deleteMutation.mutate(id);
        }
      }
    );
  };

  const addMutation = useMutation({
    mutationFn: addTag,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Tag added successfully!");
        queryClient.invalidateQueries(["tags"]);
        // navigate("/categories/list");
        // setMode("list");
        setIsLoading(false);
      } else {
        toast.error(res.message || "Failed to add tag");

        setIsLoading(false);
      }
    },
    onError: (err) => {
      for (let error in err.response?.data?.data) {
        toast.error(
          err.response?.data?.data[error][0] || "Something went wrong!"
        );
      }
      setIsLoading(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTag,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Product updated successfully!");
         queryClient.invalidateQueries(["tags"]);
      } else {
        toast.error(res.message || "Failed to update Product");
      }
      setIsLoading(false);
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('updating id :', selectedId);
    
    updateMutation.mutate({ id:selectedId, formData: editFormData });
    setEditFormData({ title: "", slug: "" });
    setSelectedId(null)
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate(formData);
    setFormData({ title: "", slug: "" });
  };

  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row ">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <h4>Tags</h4>
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
                {/* <Link to={`/product/add`} className="btn-primary">
                  + Add Product
                </Link> */}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row row-gap-3">
              <div className="col-lg-4 ">
                <div className="list-table h-100">
                <h6>Add New Tag</h6>
                <form onSubmit={handleSubmit}>
                  <div className="category-input-field">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="category-input-field">
                    <label>Slug</label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Slug"
                      value={formData.slug}
                      onChange={handleChange}
                      // required
                    />
                  </div>
                  <div className="category-form-btn">
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add New Tag"}
                    </button>
                  </div>
                </form>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="list-table">
                  {/* <h5>Tag list</h5> */}
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
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton> <h5> Edit Tag</h5></Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="category-input-field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editFormData.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="category-input-field">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                placeholder="Slug"
                value={editFormData.slug}
                onChange={handleEditChange}
                // required
              />
            </div>
            <div className="category-form-btn">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Tag"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Tags;
