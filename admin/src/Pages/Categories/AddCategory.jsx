import React, { useState } from "react";
import BackButton from "../../components/Shared/BackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCategory, getAllCategories } from "../../api/category";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import sampleImage from "../../assets/sampleImage.webp";

const AddCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    parent_category: "",
    thumbnail: null,
  });

  const { data: categoriesList = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const [preview, setPreview] = useState(sampleImage);

  // ✅ Add category mutation
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category added successfully!");
        // queryClient.invalidateQueries(["categories"]);
        navigate("/categories/list");
        // setMode("list");
        setIsLoading(false);
      } else {
        toast.error(res.message || "Failed to add category");
        setIsLoading(false);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, thumbnail: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //   const handleAddCategory = (formData) => mutation.mutate(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return toast.warning("Please enter a category title");
    // onSubmit(formData);
    setIsLoading(true);
    mutation.mutate(formData);
  };
  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <div className="d-flex align-items-center gap-3">
                <BackButton />
                <h4>Add New Category</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-8 col-lg-6">
                  <div className="category-input-field">
                    <label>Category Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter category name"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="category-input-field">
                    <label>Category Slug</label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Enter category slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="category-input-field">
                    <label>Parent Category (optional)</label>
                    <select name="parent_category" id="parent_category" value={formData.parent_category} onChange={handleChange}>
                      <option value="">None</option>
                      {categoriesList.data &&
                        categoriesList.data.length > 0 &&
                        categoriesList.data.map((category) => (
                          <option value={category.id}>{category.title}</option>
                        ))}
                    </select>
                    {/* <input
                      type="text"
                      name="parent_category"
                      placeholder="Enter parent category ID"
                      value={formData.parent_category}
                      onChange={handleChange}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="category-input-field">
                    <label>Thumbnail Image</label>
                    <input
                      type="file"
                      name="thumbnail"
                      id="thumbnail"
                      accept="image/*"
                      onChange={handleChange}
                      className="d-none"
                      //   hidden
                    />
                    <div className="category-image-preview ">
                      <img
                        src={preview}
                        alt="Preview"
                        className="img-fluid rounded-3"
                      />
                      <label htmlFor="thumbnail" className="btn btn-secondary">
                        {/* <button type="button" className="btn btn-secondary">
                                        </button> */}
                        <FaCamera /> Update{" "}
                      </label>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-6 col-md-8">
                  <div className="category-input-field">
                    <label>Thumbnail Image</label>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
                <div></div>
                {/* {preview && (
                    <div className="col-lg-4 col-md-4">
                      <div className="category-input-field">
                        <label>Preview</label>
                        <div className="category-image-preview">
                          <img
                            src={preview}
                            alt="Preview"
                            className="img-fluid rounded-3"
                          />
                        </div>
                      </div>
                    </div>
                  )} */}

                <div className="col-12 text-end mt-3">
                  <div className="category-form-btn">
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Category"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
