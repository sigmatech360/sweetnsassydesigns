import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/Shared/BackButton";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import ScreenLoader from "../../components/Shared/ScreenLoader/ScreenLoader";
import { editAttribute, updateAttribute } from "../../api/attribute";
import { FaTrash } from "react-icons/fa6";

const EditAttribute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    value: [],
  });
  const { data: attributeData = [], isPending } = useQuery({
    queryKey: [],
    queryFn: () => editAttribute(id),
  });

  useEffect(() => {
    if (attributeData.success) {
      let attribute = attributeData?.data;

      setFormData({
        name: attribute.name || "",
        value: attribute.value || "",
      });
    }
  }, [attributeData]);

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

  const updateMutation = useMutation({
    mutationFn: updateAttribute,
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
    updateMutation.mutate({ id, formData });
  };

  if (isPending) {
    return <ScreenLoader />;
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head">
              <div className="d-flex align-items-center gap-3">
                <BackButton />
                <h4>Edit Attribute</h4>
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
                      {isSubmitting ? "Updating..." : "Update Category"}
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

export default EditAttribute;
