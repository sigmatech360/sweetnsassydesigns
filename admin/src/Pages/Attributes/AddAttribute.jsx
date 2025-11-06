import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Shared/BackButton";
import { useMutation } from "@tanstack/react-query";
import { addAttribute } from "../../api/attribute";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";

const AddAttribute = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    value: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log('image updated');
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeTerm = (e, index) => {
    const { value } = e.target;
    const updatedTerms = [...formData.value];
    updatedTerms[index] = value;
    setFormData({ ...formData, value: updatedTerms });
  };

  const addTerm = () => {
    setFormData({ ...formData, value: [...formData.value, ""] });
  };

  const addMutation = useMutation({
    mutationFn: addAttribute,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Attribute updated successfully!");
        navigate(-1);
      } else {
        toast.error(res.message || "Failed to update category");
      }
      setIsSubmitting(false);
    },
    onError: (err) => {
      setIsSubmitting(false);
      toast.error(err.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!formData.name) return toast.warning("Please enter a category title");
    // onSubmit(formData);
    // setIsLoading(true);
    setIsSubmitting(true);
    addMutation.mutate(formData);
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
                <h4>Add Attribute</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Title */}
                <div className="col-12">
                  <div className="category-input-field">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 ">
                  <label htmlFor="">{formData.name} Terms</label>
                  {formData.value &&
                    formData.value.length > 0 &&
                    formData.value.map((term, index) => (
                      //   <div
                      //     key={index}
                      //     className="mb-3 d-flex align-items-center gap-3"
                      //   >
                      <div className="category-input-field d-flex align-items-center gap-3">
                        {/* <label>Name</label> */}
                        <input
                          type="text"
                          name="term"
                          placeholder="Term"
                          value={term}
                          onChange={(e) => handleChangeTerm(e, index)}
                          required
                        />
                        <button
                          className="btn btn-danger btn-sm d-flex-align-center justify-content-center"
                          type="button"
                          onClick={() => {
                            const updatedTerms = formData.value.filter(
                              (_, i) => i !== index
                            );
                            setFormData({ ...formData, value: updatedTerms });
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  <div>
                    <button
                      className="btn-secondary btn ms-auto mt-2"
                      type="button"
                      onClick={addTerm}
                    >
                      Add new {formData.name} Term
                    </button>
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

export default AddAttribute;
