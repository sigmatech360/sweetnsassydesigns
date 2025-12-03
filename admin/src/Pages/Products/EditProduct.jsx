import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/Shared/BackButton";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import ScreenLoader from "../../components/Shared/ScreenLoader/ScreenLoader";
import DatePicker from "react-datepicker";
import { Accordion, Col, Form, Nav, Row, Tab, Tabs } from "react-bootstrap";
import TextEditor from "../../components/Shared/TextEditor";
import { getAllCategories } from "../../api/category";
import { editProduct, updateProduct } from "../../api/product";
import Variations from "./TabsContent/Variations";
import Attributes from "./TabsContent/Attributes";
import {
  giftCardProductTabs,
  simpleProductTabs,
  variableProductTabs,
} from "./AddProduct";
import { FaCircleXmark, FaX } from "react-icons/fa6";
import ProductLinkedSelector from "../../components/Product/ProductLinkedSelector ";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewProductImage, setPreviewProductImage] = useState(null);
  const [previewProductGallery, setPreviewProductGallery] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sellSchedule, setSellSchedule] = useState(false);
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [giftCardAmountInput, setGiftCardAmountInput] = useState("");

  const [formData, setFormData] = useState({
    images: [],
  });

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const { data: productData = [], isPending } = useQuery({
    queryKey: [],
    queryFn: () => editProduct(id),
  });

  const editorDescription = (description) => {
    return description
      .replace(/\\r\\n/g, "") // remove escaped \r\n
      .replace(/\\n/g, "") // remove escaped \n
      .replace(/\\r/g, "") // remove escaped \r
      .replace(/[\r\n]/g, "") // remove real newline characters
      .trim();
  };

  useEffect(() => {
    if (productData.success) {
      let product = productData?.data;
      console.log("product", product);

      setFormData({
        title: product.title || "",
        // product_description: product.product_description || "",
        // short_description: product.short_description || "",
        product_type: product.product_type || "",
        images: product.images || "",
        price: product.price || "",
        feature: product.feature,
        status: product.status,
        simple_product: product.simple_product,
        variations: product.variations,
        categories: product.categories || [],
        tags: product.tags || [],
        attributes: product.attributes || [],
        gift_card_amounts: product.gift_card_amounts || [],
        upsell: product.upsell || [],
        cross_sells: product.cross_sells || [],
      });
      if (product.simple_product?.sale_price != "") {
        setSellSchedule(true);
      }
      // product_description
      if (product.product_description) {
        let description = editorDescription(product.product_description);
        setFormData((prev) => ({ ...prev, product_description: description }));
      }
      // short_description
      if (product.short_description) {
        let description = editorDescription(product.short_description);
        setFormData((prev) => ({ ...prev, short_description: description }));
      }
      // if(product.product_type == )
      setPreviewProductImage(
        `${import.meta.env.VITE_API_BASE_URL}/${product.images[0]}`
      );
      let prductGalleryImages = [];
      if (product.images.length > 1) {
        product.images.forEach((image, ind) => {
          prductGalleryImages.push(
            `${import.meta.env.VITE_API_BASE_URL}/${image}`
          );
        });
      }
      setPreviewProductGallery(prductGalleryImages);
      setIsProductLoaded(true);
    } else {
      setIsProductLoaded(true);
    }
  }, [productData]);

  const [activeTab, setActiveTab] = useState(() => {
    // initial value based on initial product_type
    const pt = formData.product_type;
    if (pt === "simple") return simpleProductTabs[0]?.eventKey ?? "general";
    if (pt === "variable") return variableProductTabs[0]?.eventKey ?? "general";
    if (pt === "pw-gift-card")
      return giftCardProductTabs[0]?.eventKey ?? "general";
    return "general";
  });

  useEffect(() => {
    const pt = formData.product_type;
    let currentList = [];
    if (pt === "simple") currentList = simpleProductTabs;
    if (pt === "variable") currentList = variableProductTabs;
    if (pt === "pw-gift-card") currentList = giftCardProductTabs;

    // if current active tab exists in the new list, keep it
    const exists = currentList.some((t) => t.eventKey === activeTab);

    if (!exists) {
      // otherwise set to first key if available, else fallback
      const firstKey = currentList[0]?.eventKey ?? "general";
      setActiveTab(firstKey);
    }
    // run when product_type or lists change
  }, [formData.product_type]);

  const { data } = useQuery({
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setTagInput(value);
  };
  const handleAddTag = (e) => {
    if(tagInput == ""){return}
    setFormData((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput], // fallback to empty array
    }));
    setTagInput("");
  };

  const removeTag = (index) => {
    let tags = [...formData.tags];
    tags = tags.filter((_, ind) => ind !== index);
    setFormData({ ...formData, tags: tags });
  };

  const handleGiftCardAmountsChange = (e) => {
    const { name, value } = e.target;
    setGiftCardAmountInput(value);
  };

  const handleAddGiftCardAmounts = (e) => {
    setFormData((prev) => ({
      ...prev,
      gift_card_amounts: [
        ...(prev.gift_card_amounts || []),
        giftCardAmountInput,
      ], // fallback to empty array
    }));
    setGiftCardAmountInput("");
  };

  const removeGiftCardAmounts = (index) => {
    let gift_card_amounts = [...formData.gift_card_amounts];
    gift_card_amounts = gift_card_amounts.filter((_, ind) => ind !== index);
    setFormData({ ...formData, gift_card_amounts: gift_card_amounts });
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked ? 1 : 0);
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };

  const handleCategoryChange = (id, name) => {
    // const { name, checked } = e.target;
    // console.log(name, checked);
    let updatedCategories = [...selectedCategory];
    if (updatedCategories.some((item) => item.id == id)) {
      updatedCategories = updatedCategories.filter((item) => item.id !== id);
    } else {
      updatedCategories.push({ id, name });
    }
    setSelectedCategory(updatedCategories);
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
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
    let images = [...formData.images, ...files];
    console.log("updated images", images);

    setFormData({ ...formData, images: images });
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewProductGallery((prev) => [...prev, ...previewUrls]);
  };

  const deleteProductGalleryImage = (index) => {
    let images = [...formData.images];
    images.splice(index + 1, 1);
    setFormData({ ...formData, images: images });
    let previewUrls = [...previewProductGallery];
    previewUrls.splice(index, 1);
    setPreviewProductGallery(previewUrls);
  };

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Product updated successfully!");
        navigate(-1);
      } else {
        toast.error(res.message || "Failed to update Product");
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
    setIsSubmitting(true);
    updateMutation.mutate({ id, formData });
  };

  if (!isProductLoaded) {
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
                <h4>Edit Product</h4>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row product_form">
              <div className="col-xl-9 col-lg-8">
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
                  <div className="product_header d-flex align-items-center flex-wrap gap-4">
                    <p>Product Type</p>
                    <div className="category-input-field">
                      <select
                        name="product_type"
                        value={formData.product_type}
                        id=""
                        onChange={handleChange}
                      >
                        <option value="simple">Simple Product</option>
                        <option value="variable">Variable Product</option>
                        <option value="pw-gift-card">PW Gift Card</option>
                      </select>
                    </div>
                    {formData.product_type === "simple" && (
                      <>
                        <div className="d-flex align-items-center gap-2 ">
                          <input
                            type="checkbox"
                            name="virtual"
                            id="virtual"
                            checked={formData.simple_product?.virtual == 1}
                            onChange={(e) => {
                              const { checked } = e.target;
                              setFormData((prev) => ({
                                ...prev,
                                simple_product: {
                                  ...prev["simple_product"],
                                  virtual: checked ? 1 : 0,
                                },
                              }));
                            }}
                          />
                          <label htmlFor="virtual">Virtual</label>
                        </div>
                        <div className="d-flex align-items-center gap-2 ">
                          <input
                            type="checkbox"
                            name="downloadable"
                            onChange={(e) => {
                              const { checked } = e.target;
                              setFormData((prev) => ({
                                ...prev,
                                simple_product: {
                                  ...prev["simple_product"],
                                  downloadable: checked ? 1 : 0,
                                },
                              }));
                            }}
                            id="downloadable"
                            checked={formData.simple_product?.downloadable == 1}
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
                    >
                      <Row>
                        <Col xs={2} md={2} lg={3} className="nav-tabs">
                          <Nav variant="pills" className="flex-column">
                            {formData.product_type === "simple" &&
                              simpleProductTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                  <Nav.Item key={tab.eventKey}>
                                    <Nav.Link
                                      className="text-center text-md-start"
                                      eventKey={tab.eventKey}
                                    >
                                      <Icon />{" "}
                                      <span className="d-md-inline d-none">
                                        {tab.title}
                                      </span>
                                    </Nav.Link>
                                  </Nav.Item>
                                );
                              })}
                            {formData.product_type === "variable" &&
                              variableProductTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                  <Nav.Item key={tab.eventKey}>
                                    <Nav.Link
                                      className="text-center text-md-start"
                                      eventKey={tab.eventKey}
                                    >
                                      <Icon />{" "}
                                      <span className="d-md-inline d-none">
                                        {tab.title}
                                      </span>
                                    </Nav.Link>
                                  </Nav.Item>
                                );
                              })}
                            {formData.product_type === "pw-gift-card" &&
                              giftCardProductTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                  <Nav.Item key={tab.eventKey}>
                                    <Nav.Link
                                      className="text-center text-md-start"
                                      eventKey={tab.eventKey}
                                    >
                                      <Icon />{" "}
                                      <span className="d-md-inline d-none">
                                        {tab.title}
                                      </span>
                                    </Nav.Link>
                                  </Nav.Item>
                                );
                              })}
                          </Nav>
                        </Col>
                        <Col xs={10} md={10} lg={9}>
                          <Tab.Content>
                            <Tab.Pane eventKey="gift_card_options">
                              <div className="row mb-3">
                                <div className="col-sm-3">
                                  Gift card amounts ($)
                                </div>
                                <div className="col-sm-8">
                                  <div className="d-flex gap-2">
                                    <div className="category-input-field m-0">
                                      <input
                                        type="text"
                                        className=""
                                        name="gift_card_amounts"
                                        value={giftCardAmountInput}
                                        onChange={handleGiftCardAmountsChange}
                                      />
                                    </div>
                                    <button
                                      onClick={handleAddGiftCardAmounts}
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      Add
                                    </button>
                                  </div>
                                  <div className=" selected-products flex-wrap flex-row gap-3 mt-3">
                                    {formData?.gift_card_amounts?.length > 0 &&
                                      formData.gift_card_amounts?.map(
                                        (t, ind) => (
                                          <div
                                            key={ind}
                                            className="position-relative badge bg-primary"
                                            onClick={() =>
                                              removeGiftCardAmounts(ind)
                                            }
                                          >
                                            ${t}
                                            <span className="delete-icon">
                                              <FaX size={8} />
                                            </span>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>
                            </Tab.Pane>
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
                                    value={
                                      formData.simple_product?.regular_price ||
                                      ""
                                    }
                                    onChange={(e) => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        simple_product: {
                                          ...prev["simple_product"],
                                          regular_price: e.target.value,
                                        },
                                      }));
                                    }}
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
                                    value={
                                      formData.simple_product?.sale_price || ""
                                    }
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        simple_product: {
                                          ...prev["simple_product"],
                                          sale_price: e.target.value,
                                        },
                                      }));
                                    }}
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
                                        selected={
                                          formData.simple_product
                                            ?.sale_price_dates_start
                                        }
                                        onChange={(date) => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            simple_product: {
                                              ...prev["simple_product"],
                                              sale_price_dates_start: date,
                                            },
                                          }));
                                        }}
                                        placeholderText="From... YYYY-MM-DD"
                                        className="form-control mb-3"
                                        calendarContainer={({ children }) => (
                                          <div className="bg-white react-datepicker">
                                            {children}
                                            {/* {renderFooter("start")} */}
                                          </div>
                                        )}
                                      />
                                    </div>
                                    <div>
                                      <DatePicker
                                        // selected={formik.values.issue_date}
                                        // onChange={(date) => {
                                        //   setStartDate(date);
                                        //   formik.setFieldValue("issue_date", date);
                                        // }}
                                        selected={
                                          formData.simple_product
                                            ?.sale_price_dates_end
                                        }
                                        onChange={(date) => {
                                          // formik.setFieldValue("issue_date", date);
                                          setFormData((prev) => ({
                                            ...prev,
                                            simple_product: {
                                              ...prev["simple_product"],
                                              sale_price_dates_end: date,
                                            },
                                          }));
                                        }}
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
                              {formData.simple_product?.downloadable == 1 && (
                                <div className="category-input-field border border-secondary p-2 mt-3">
                                  <div className=" d-flex align-items-end gap-3 border-top border-bottom pt-2">
                                    <div className="flex-grow-1 d-flex align-items-start gap-3">
                                      <div className=" flex-grow-1">
                                        <label htmlFor="">File Name</label>
                                        <input
                                          type="text"
                                          name="download_files_name"
                                          placeholder="File Name"
                                          value={
                                            formData.simple_product
                                              ?.downloadableFiles?.[0]?.name
                                          }
                                          onChange={(e) => {
                                            const { value } = e.target;

                                            setFormData((prev) => ({
                                              ...prev,
                                              simple_product: {
                                                ...prev.simple_product,
                                                downloadableFiles: [
                                                  {
                                                    ...(prev.simple_product
                                                      ?.downloadableFiles?.[0] ||
                                                      {}),
                                                    name: value,
                                                  },
                                                ],
                                              },
                                            }));
                                          }}
                                          required
                                        />
                                      </div>
                                      {/* <label>Name</label> */}
                                      <div className=" flex-grow-1">
                                        {/* <input
                                          type="text"
                                          name="url"
                                          placeholder="http://"
                                          value={URL.createObjectURL(
                                            formData.simple_product
                                              ?.downloadableFiles?.[0]?.file
                                          )}
                                          onChange={(e) => {
                                            // handleDownloadableFileChange(
                                            //   e,
                                            //   index,
                                            //   ind
                                            // )
                                          }}
                                          required
                                          readOnly
                                        /> */}
                                        <label htmlFor="">File Url</label>
                                        <div>
                                          {formData.simple_product
                                            ?.downloadableFiles?.[0]?.file ? (
                                            <a
                                              target="_blank"
                                              href={
                                                formData.simple_product?.downloadableFiles?.[0]?.file.startsWith(
                                                  "blob:"
                                                )
                                                  ? URL.createObjectURL(
                                                      formData.simple_product
                                                        ?.downloadableFiles?.[0]
                                                        ?.file
                                                    )
                                                  : `${
                                                      import.meta.env
                                                        .VITE_API_BASE_URL
                                                    }/${
                                                      formData.simple_product
                                                        ?.downloadableFiles?.[0]
                                                        ?.file
                                                    }`
                                              }
                                            >
                                              {formData.simple_product
                                                ?.downloadableFiles?.[0]
                                                ?.name || "file"}
                                              .zip
                                            </a>
                                          ) : (
                                            <i className="text-secondary">
                                              file url
                                            </i>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <input
                                      type="file"
                                      id={`downloadableFile_file`}
                                      name="file"
                                      accept=".zip"
                                      onChange={(e) => {
                                        const { files } = e.target;
                                        let file = files[0];
                                        if (file) {
                                          setFormData((prev) => ({
                                            ...prev,
                                            simple_product: {
                                              ...prev.simple_product,
                                              downloadableFiles: [
                                                {
                                                  ...(prev.simple_product
                                                    ?.downloadableFiles?.[0] ||
                                                    {}),
                                                  file: file,
                                                },
                                              ],
                                            },
                                          }));
                                        }
                                      }}
                                      hidden
                                    />

                                    <label
                                      htmlFor={`downloadableFile_file`}
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      Choose File
                                    </label>
                                  </div>
                                </div>
                              )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="linked_products">
                              <div className="row mb-3">
                                <div className="col-sm-4">Upsells</div>
                                <div className="col-sm-8">
                                  <ProductLinkedSelector
                                    data={formData?.upsell}
                                    formData={formData}
                                    setFormData={setFormData}
                                    formKey="upsell"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-4">Cross-sells</div>
                                <div className="col-sm-8">
                                  <ProductLinkedSelector
                                    data={formData?.cross_sells}
                                    formData={formData}
                                    setFormData={setFormData}
                                    formKey="cross_sells"
                                  />
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
                                  handleChange={handleChange}
                                />
                              ) : (
                                <p>Please select atleast 1 attribute.</p>
                              )}
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
              <div className="col-xl-3 col-lg-4 product_sidebar">
                <div className="product">
                  <p className="product_header">Publish</p>
                  <div className="border p-3 ">
                    <div className=" d-flex align-items-center gap-3 mb-3">
                      <label>Status :</label>
                      <div className="category-input-field mb-0">
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="1">Published</option>
                          <option value="0">Pending Review</option>
                        </select>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        id="feature"
                        name="feature"
                        onChange={handleCheck}
                        checked={formData.feature == 1}
                      />
                      <label className="fw-bold" htmlFor="feature">
                        Featured
                      </label>
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
                              checked={formData.categories?.some(
                                (cat) => cat.id == category.id
                              )}
                              onChange={() =>
                                handleCategoryChange(
                                  category.id,
                                  category.title
                                )
                              }
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
                                      // name={`category_${subcat.id}`}
                                      id={`category_${subcat.id}`}
                                      checked={formData.categories?.some(
                                        (cat) => cat.id == subcat.id
                                      )}
                                      onChange={() =>
                                        handleCategoryChange(
                                          subcat.id,
                                          subcat.title
                                        )
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
                <div className="product  mt-3">
                  <p className="product_header">Product tags</p>
                  <div className="border product_categories_list p-3">
                    <div className="d-flex gap-2">
                      <div className="category-input-field m-0">
                        <input
                          type="text"
                          className=""
                          name="tag"
                          value={tagInput}
                          onChange={handleTagChange}
                        />
                      </div>
                      <button
                        onClick={handleAddTag}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Add
                      </button>
                    </div>
                    <div className=" d-flex gap-3 mt-3">
                      {formData.tags?.length > 0 &&
                        formData.tags?.map((t, ind) => (
                          <div
                            key={ind}
                            className="position-relative d-flex gap-1 align-items-center"
                            onClick={() => removeTag(ind)}
                          >
                            <span className="text-primary cursor-pointer">
                              <FaCircleXmark />
                            </span>
                            <span className="">{t}</span>
                            <h6></h6>
                          </div>
                        ))}
                    </div>
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

export default EditProduct;
