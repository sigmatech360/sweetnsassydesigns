import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Shared/BackButton";
import { useMutation } from "@tanstack/react-query";
import { addAttribute } from "../../api/attribute";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import TextEditor from "../../components/Shared/TextEditor";
import { formatDate } from "../../utils/dateFormat";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    value: [],
  });
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name, checked);
    setFormData({ ...formData, [name]: value });
  };
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked? 1 : 0);
    setFormData({ ...formData, [name]: checked? 1 : 0 });
  };
  //   const handleChangeTerm = (e, index) => {
  //     const { value } = e.target;
  //     const updatedTerms = [...formData.value];
  //     updatedTerms[index] = value;
  //     setFormData({ ...formData, value: updatedTerms });
  //   };

  //   const addTerm = () => {
  //     setFormData({ ...formData, value: [...formData.value, ""] });
  //   };

  //   const addMutation = useMutation({
  //     mutationFn: addAttribute,
  //     onSuccess: (res) => {
  //       if (res.success) {
  //         toast.success(res.message || "Attribute updated successfully!");
  //         navigate(-1);
  //       } else {
  //         toast.error(res.message || "Failed to update category");
  //       }
  //       setIsSubmitting(false);
  //     },
  //     onError: (err) => {
  //       setIsSubmitting(false);
  //       toast.error(err.response?.data?.message || "Something went wrong!");
  //     },
  //   });

    const handleSubmit = (e) => {
      e.preventDefault();
      const formDataMethod = new FormData();
      formDataMethod.append("product_name", formData.product_name);
      formDataMethod.append("product_description", formData.product_description);
      formDataMethod.append("product_short_description", formData.product_short_description);
      formDataMethod.append("product_type", formData.product_type);

      if(formData.product_type == 'simple'){
        formDataMethod.append("downloadbale", formData.downloadbale);
        formDataMethod.append("virtual", formData.virtual);
      }
      // if (!formData.name) return toast.warning("Please enter a category title");
      // onSubmit(formData);
      // setIsLoading(true);
      setIsSubmitting(true);
    //   addMutation.mutate(formData);
    };
  return (
    <section>
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <div className="d-flex align-items-center gap-3">
                <BackButton />
                <h4>Add Product</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <form>
              <div className="row">
                {/* Title */}
                <div className="col-12">
                  <div className="category-input-field">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="product_name"
                      placeholder="Product Name"
                      value={formData.product_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="category-input-field">
                    <div className="product">
                      <p className="product_header">Product Description</p>
                      <TextEditor
                        name="product_description"
                        value={formData.product_description}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="category-input-field">
                    <div className="product">
                      <div className="product_header d-flex align-items-center gap-4">
                        <p>Product Type</p>
                        <div>
                        <select name="product_type" id="" onChange={handleChange}>
                            <option value="simple">Simple Product</option>
                            <option value="variable">Variable Product</option>
                            <option value="pw-gift-card">PW Gift Card</option>
                        </select>

                        </div>
                        {formData.product_type === 'simple' && (
                            <>
                            <div className="d-flex align-items-center gap-2 ">
                                <input type="checkbox"  name="virtual" id="virtual" onChange={handleCheck} />
                                <label htmlFor="virtual">Virtual</label>
                            </div>
                            <div className="d-flex align-items-center gap-2 ">
                                <input type="checkbox" name="downloadable" onChange={handleCheck} id="downloadable" />
                                <label htmlFor="downloadable">Downloadable</label>
                            </div>
                            </>
                        )}
                      </div>
                      <input
                        type="text"
                        name="product_name"
                        placeholder="Product Name"
                        value={formData.product_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="category-input-field">
                    <div className="product">
                      <p className="product_header">
                        Product Short Description
                      </p>
                      <TextEditor
                        name="product_short_description"
                        value={formData.product_short_description}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="col-12  mt-5">
                  <div className="category-form-btn">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Category"}
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

export default AddProduct;
