import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Shared/BackButton";
import DatePicker from "react-datepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addAttribute, getAllAttributes } from "../../api/attribute";
import { toast } from "react-toastify";
import { FaCaretDown, FaTrash, FaX } from "react-icons/fa6";
import TextEditor from "../../components/Shared/TextEditor";
import { formatDate } from "../../utils/dateFormat";
import { Accordion, Col, Form, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { getAllCategories } from "../../api/category";
import { addProduct } from "../../api/product";
import CustomMultiSelect from "../../components/Shared/CustomMultiSelect";
import Variations from "./TabsContent/Variations";
import Attributes from "./TabsContent/Attributes";

const AddProduct = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const attributesList = ["Color", "Size", "Material", "Brand"];

  const [productImage, setproductImage] = useState(null);
  const [previewProductImage, setPreviewProductImage] = useState(null);
  const [previewProductGallery, setPreviewProductGallery] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [formData, setFormData] = useState({
    product_type: "simple_product",
    title: "",
    product_description: "",
    short_description: "",
    images: [],
    regular_price: "",
    sale_price: "",
    attributes:[]
  });

  let simpleProductTabs = [
    { eventKey: "general", title: "General" },
    { eventKey: "linked_products", title: "Linked Products" },
    // { eventKey: "attributes", title: "Attributes" },
  ];
  let variableProductTabs = [
    { eventKey: "linked_products", title: "Linked Products" },
    { eventKey: "attributes", title: "Attributes" },
    { eventKey: "variations", title: "Variations" },
  ];

  let giftCardProductTabs = [
    { eventKey: "gift_card_options", title: "Gift Card" },
    { eventKey: "linked_products", title: "Linked Products" },
    { eventKey: "attributes", title: "Attributes" },
    { eventKey: "variations", title: "Variations" },
  ];

  const [activeTab, setActiveTab] = useState(() => {
    // initial value based on initial product_type
    const pt = formData.product_type;
    if (pt === "simple_product")
      return simpleProductTabs[0]?.eventKey ?? "general";
    if (pt === "variable_product")
      return variableProductTabs[0]?.eventKey ?? "general";
    if (pt === "gift_card_product")
      return giftCardProductTabs[0]?.eventKey ?? "general";
    return "general";
  });

  useEffect(() => {
    const pt = formData.product_type;
    let currentList = [];
    if (pt === "simple_product") currentList = simpleProductTabs;
    if (pt === "variable_product") currentList = variableProductTabs;
    if (pt === "gift_card_product") currentList = giftCardProductTabs;

    // if current active tab exists in the new list, keep it
    const exists = currentList.some((t) => t.eventKey === activeTab);

    if (!exists) {
      // otherwise set to first key if available, else fallback
      const firstKey = currentList[0]?.eventKey ?? "general";
      setActiveTab(firstKey);
    }
    // run when product_type or lists change
  }, [formData.product_type]);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (data && data.status) {
      setCategoriesList(data.data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked ? 1 : 0);
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };

  const handleCategoryChange = (id) => {
    // const { name, checked } = e.target;
    // console.log(name, checked);
    let updatedCategories = [...selectedCategory];
    if (updatedCategories.includes(id)) {
      updatedCategories = updatedCategories.filter((catId) => catId !== id);
    } else {
      updatedCategories.push(id);
    }
    setSelectedCategory(updatedCategories);
    // console.log('Selected Categories:', updatedCategories);
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    let images = [file, ...formData.images];
    setFormData({ ...formData, images: images });
    setPreviewProductImage(URL.createObjectURL(file));
  };

  const deleteProductImage = () => {
    let images = [...formData.images].splice(1);
    setFormData({ ...formData, images: images });
    setPreviewProductImage(null);
  };

  const handleProductGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files);
    let images = [...formData.images, ...files];
    setFormData({ ...formData, images: images });
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewProductGallery(previewUrls);
  };

  const deleteProductGalleryImage = (index) => {
    let images = [...formData.images];
    images.splice(index + 1, 1);
    setFormData({ ...formData, images: images });
    let previewUrls = [...previewProductGallery];
    previewUrls.splice(index, 1);
    setPreviewProductGallery(previewUrls);
  };

  const [sellSchedule, setSellSchedule] = useState(false);

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Product updated successfully!");
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

  const handleSubmit = () => {
    // e.preventDefault();
    const formDataMethod = new FormData();
    formDataMethod.append("title", formData.title);
    formDataMethod.append("product_description", formData.product_description);
    formDataMethod.append("short_description", formData.short_description);
    formDataMethod.append("product_type", formData.product_type);

    if (formData.product_type == "simple") {
      formDataMethod.append("downloadbale", formData.downloadbale);
      formDataMethod.append("virtual", formData.virtual);
    }
    formDataMethod.append("regular_price", formData.regular_price);
    formDataMethod.append("sale_price", formData.sale_price);
    formData.images.forEach((image, index) => {
      formDataMethod.append(`images[${index}]`, image);
    });
    selectedCategory.forEach((catId, index) => {
      formDataMethod.append(`category_id[${index}]`, catId);
    });

    console.log("Form Data Submitted:", formData);
    // if (!formData.name) return toast.warning("Please enter a category title");
    // onSubmit(formData);
    // setIsLoading(true);
    setIsSubmitting(true);
    // addMutation.mutate(formData);
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
          <div className="col-12">
            <div className="row product_form">
              <div className="col-lg-9">
                {/* Title */}
                <div className="category-input-field">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Name"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                <div className="product mb-3">
                  <div className="product_header d-flex align-items-center gap-4">
                    <p>Product Type</p>
                    <div className="category-input-field">
                      <select name="product_type" id="" onChange={handleChange}>
                        <option value="simple_product">Simple Product</option>
                        <option value="variable_product">
                          Variable Product
                        </option>
                        <option value="gift_card_product">PW Gift Card</option>
                      </select>
                    </div>
                    {formData.product_type === "simple_product" && (
                      <>
                        <div className="d-flex align-items-center gap-2 ">
                          <input
                            type="checkbox"
                            name="virtual"
                            id="virtual"
                            onChange={handleCheck}
                          />
                          <label htmlFor="virtual">Virtual</label>
                        </div>
                        <div className="d-flex align-items-center gap-2 ">
                          <input
                            type="checkbox"
                            name="downloadable"
                            onChange={handleCheck}
                            id="downloadable"
                          />
                          <label htmlFor="downloadable">Downloadable</label>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="product-tabs">
                    <Tab.Container
                      id="left-tabs-example"
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k)}
                      // defaultActiveKey={
                      //   formData.product_type === "simple_product"
                      //     ? simpleProductTabs[0]?.eventKey
                      //     : formData.product_type === "variable_product"
                      //     ? variableProductTabs[0]?.eventKey
                      //     : giftCardProductTabs[0]?.eventKey
                      // }
                    >
                      <Row>
                        <Col sm={2} className="nav-tabs">
                          <Nav variant="pills" className="flex-column">
                            {formData.product_type === "simple_product" &&
                              simpleProductTabs.map((tab) => (
                                <Nav.Item key={tab.eventKey}>
                                  <Nav.Link eventKey={tab.eventKey}>
                                    {tab.title}
                                  </Nav.Link>
                                </Nav.Item>
                              ))}
                            {formData.product_type === "variable_product" &&
                              variableProductTabs.map((tab) => (
                                <Nav.Item key={tab.eventKey}>
                                  <Nav.Link eventKey={tab.eventKey}>
                                    {tab.title}
                                  </Nav.Link>
                                </Nav.Item>
                              ))}
                            {formData.product_type === "gift_card_product" &&
                              giftCardProductTabs.map((tab) => (
                                <Nav.Item key={tab.eventKey}>
                                  <Nav.Link eventKey={tab.eventKey}>
                                    {tab.title}
                                  </Nav.Link>
                                </Nav.Item>
                              ))}
                          </Nav>
                        </Col>
                        <Col sm={10}>
                          <Tab.Content>
                            <Tab.Pane eventKey="general">
                              <div className="row mb-3">
                                <div className="col-sm-4">
                                  Regular price ($)
                                </div>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    name="regular_price"
                                    // placeholder="Product Name"
                                    className="w-auto px-2 py-1"
                                    value={formData.regular_price}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-4">Sale price ($)</div>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    name="sale_price"
                                    // placeholder="Product Name"
                                    className="w-auto px-2 py-1"
                                    value={formData.sale_price}
                                    onChange={handleChange}
                                    required
                                  />
                                  <div>
                                    {!sellSchedule && (
                                      <span
                                        onClick={() => {
                                          console.log("schedule");
                                          setSellSchedule(true);
                                        }}
                                        className="pruduct_button"
                                      >
                                        Schedule
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {sellSchedule && (
                                <div className="row mt-3">
                                  <div className="col-sm-4">
                                    Sale price dates
                                  </div>
                                  <div className="col-sm-8">
                                    <div>
                                      <DatePicker
                                        // selected={formik.values.issue_date}
                                        // onChange={(date) => {
                                        //   setStartDate(date);
                                        //   formik.setFieldValue("issue_date", date);
                                        // }}
                                        placeholderText="From... YYYY-MM-DD"
                                        className="form-control mb-3"
                                        calendarContainer={({ children }) => (
                                          <div className="bg-white react-datepicker">
                                            {children}
                                            {/* {renderFooter("start")} */}
                                          </div>
                                        )}
                                      />
                                      <DatePicker
                                        // selected={formik.values.issue_date}
                                        // onChange={(date) => {
                                        //   setStartDate(date);
                                        //   formik.setFieldValue("issue_date", date);
                                        // }}
                                        placeholderText="To... YYYY-MM-DD"
                                        className="form-control"
                                        calendarContainer={({ children }) => (
                                          <div className="bg-white react-datepicker">
                                            {children}
                                            {/* {renderFooter("start")} */}
                                          </div>
                                        )}
                                      />
                                    </div>
                                    <span
                                      onClick={() => {
                                        console.log("schedule");
                                        setSellSchedule(false);
                                      }}
                                      className="pruduct_button"
                                    >
                                      Cancel
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="linked_products">
                              <div className="row mb-3">
                                <div className="col-sm-4">Upsells</div>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    name="upsells"
                                    // placeholder="Product Name"
                                    className="w-auto px-2 py-1"
                                    value={formData.upsells}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-4">Cross-sells</div>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    name="cross_sells"
                                    // placeholder="Product Name"
                                    className="w-auto px-2 py-1"
                                    value={formData.cross_sells}
                                    onChange={handleChange}
                                    required
                                  />
                                  <div>
                                    {!sellSchedule && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          console.log("schedule");
                                          setSellSchedule(true);
                                        }}
                                        className="text-primary bg-transparent border-0 text-decoration-underline cursor-pointer"
                                      >
                                        Schedule
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="attributes">
                              <Attributes
                                formData={formData}
                                setFormData={setFormData}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey="variations">
                              {formData.attributes?.length > 0 ? (

                              <Variations
                                formData={formData}
                                setFormData={setFormData}
                              />
                              ):(<p>Please select atleast 1 attribute.</p>)}
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                </div>

                <div className="category-input-field">
                  <div className="product">
                    <p className="product_header">Product Short Description</p>
                    <TextEditor
                      name="short_description"
                      value={formData.short_description}
                      handleChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row"></div>
              </div>
              <div className="col-lg-3 product_sidebar">
                <div className="product">
                  <p className="product_header">Publish</p>
                  <div className="border p-3 ">
                    <div className="category-input-field">
                      <label>Status :</label>
                      <select name="status" onChange={handleChange}>
                        <option value="0">Pending Review</option>
                      </select>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="d-block ms-auto btn-sm btn btn-primary"
                    >
                      Publish
                    </button>
                  </div>
                </div>
                <div className="product mt-3">
                  <p className="product_header">Product Image</p>
                  <div className="border p-3">
                    {!previewProductImage && (
                      <label htmlFor="product_image" className="pruduct_button">
                        Set Product Image
                      </label>
                    )}
                    <input
                      type="file"
                      onChange={handleProductImageChange}
                      hidden
                      id="product_image"
                    />
                    {previewProductImage && (
                      // <div className="product_image">
                      // </div>
                      <>
                        <img
                          className="w-100"
                          src={previewProductImage}
                          alt=""
                        />
                        <p
                          className="text-danger mt-3 text-decoration-underline cursor-pointer"
                          onClick={deleteProductImage}
                        >
                          Remove Product Image
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="product mt-3">
                  <p className="product_header">Product Gallery</p>
                  <div className="border p-3">
                    {previewProductGallery &&
                      previewProductGallery.length > 0 && (
                        // <div className="product_image">
                        // </div>
                        <div className="product_gallery_images row">
                          {previewProductGallery.map((image, index) => (
                            <div
                              className="col-sm-4 position-relative"
                              key={index}
                            >
                              <img className="w-100" src={image} alt="" />
                              <span
                                className="delete_gallery_image"
                                onClick={() => deleteProductGalleryImage(index)}
                              >
                                <FaX size={10} />
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    <label htmlFor="product_gallery" className="pruduct_button">
                      Add product gallery images
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleProductGalleryChange}
                      hidden
                      id="product_gallery"
                    />
                  </div>
                </div>
                <div className="product  mt-3">
                  <p className="product_header">Product Categories</p>
                  <div className="border product_categories_list p-3">
                    {categoriesList && categoriesList.length > 0 ? (
                      categoriesList.map((category) => (
                        <div key={category.id}>
                          <div className="mb-2">
                            <input
                              type="checkbox"
                              name={`category_${category.id}`}
                              id={`category_${category.id}`}
                              onChange={() => handleCategoryChange(category.id)}
                            />
                            <label
                              htmlFor={`category_${category.id}`}
                              className="ms-2"
                            >
                              {category.title}
                            </label>
                          </div>
                          {category.subcategories &&
                            category.subcategories.length > 0 && (
                              <div className="ms-4">
                                {category.subcategories.map((subcat) => (
                                  <div key={subcat.id} className="mb-2">
                                    <input
                                      type="checkbox"
                                      name={`category_${subcat.id}`}
                                      id={`category_${subcat.id}`}
                                      onChange={() =>
                                        handleCategoryChange(subcat.id)
                                      }
                                    />
                                    <label
                                      htmlFor={`category_${subcat.id}`}
                                      className="ms-2"
                                    >
                                      {subcat.title}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))
                    ) : (
                      <p>No categories found.</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Submit */}
              {/* <div className="  mt-5">
                <div className="category-form-btn">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Category"}
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
