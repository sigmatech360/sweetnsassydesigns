import React, { useState, useEffect } from "react";

const EditCategoryForm = ({ category, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    parent_category: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || "",
        parent_category: category.parent_category || "",
        thumbnail: null,
      });

      if (category.thumbnail) {
        setPreview(`${import.meta.env.VITE_API_BASE_URL}${category.thumbnail}`);
      }
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a category title");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("parent_category", formData.parent_category || "");
    if (formData.thumbnail) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    onSubmit(formDataToSend);
  };

  return (
    <section className="catetory-form-sec">
      <div className="container">
        <div className="row">
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
                <div className="col-lg-8 col-md-8">
                  <div className="category-input-field">
                    <label>Thumbnail Image</label>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Preview */}
                {preview && (
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
                )}

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

export default EditCategoryForm;
