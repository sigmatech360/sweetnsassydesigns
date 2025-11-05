import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editCategory, updateCategory } from "../../api/category";
import BackButton from "../../components/Shared/BackButton";
import { FaCamera } from "react-icons/fa6";
import sampleImage from "../../assets/sampleImage.webp"

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    parent_category: "",
    thumbnail: null,
  });
  const [preview, setPreview] = useState(sampleImage);
  const { data: categoryData = [], isLoading } = useQuery({
    queryKey: [],
    queryFn: () => editCategory(id),
  });

  useEffect(() => {
    console.log("categoryData", categoryData);

    if (categoryData.success) {
      let category = categoryData?.data;
      console.log("category", category);

      setFormData({
        title: category.title || "",
        parent_category: category.parent_category || "",
        thumbnail: `${import.meta.env.VITE_API_BASE_URL}${category.thumbnail}`,
      });

      if (category.thumbnail) {
        setPreview(`${import.meta.env.VITE_API_BASE_URL}${category.thumbnail}`);
      }
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log('image updated');

    if (name === "thumbnail" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, thumbnail: file });
      setPreview(URL.createObjectURL(file));
      
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //   const mutation = useMutation({
  //     mutationFn: addCategory,
  //     onSuccess: (res) => {
  //       if (res.success) {
  //         toast.success(res.message || "Category added successfully!");
  //         // queryClient.invalidateQueries(["categories"]);
  //         navigate("/categories/list");
  //         // setMode("list");
  //         // setIsLoading(false);
  //       } else {
  //         toast.error(res.message || "Failed to add category");
  //         // setIsLoading(false);
  //       }
  //     },
  //     onError: (err) => {
  //       toast.error(err.response?.data?.message || "Something went wrong!");
  //     },
  //   });
  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category updated successfully!");
        // queryClient.invalidateQueries(["categories"]);
        // setMode("list");
        navigate(-1);
      } else {
        toast.error(res.message || "Failed to update category");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return toast.warning("Please enter a category title");
    // onSubmit(formData);
    // setIsLoading(true);
    updateMutation.mutate({id,formData});
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
                <h4>Edit Category</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Title */}
                <div className="col-md-6">
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
                </div>

                {/* Parent Category */}
                <div className="col-md-6">
                  <div className="category-input-field">
                    <label>Parent Category (optional)</label>
                    <input
                      type="text"
                      name="parent_category"
                      placeholder="Enter parent category ID"
                      value={formData.parent_category}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="col-lg-3 col-md-8">
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
                <div></div>

                {/* Preview */}
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

                {/* Submit */}
                <div className="col-12 text-end mt-3">
                  <div className="category-form-btn">
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Category"}
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

export default EditCategory;
