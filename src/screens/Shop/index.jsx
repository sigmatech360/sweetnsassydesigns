import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { shopPageProducts } from "../../data";
import { getPaginationRange } from "../../helper/getPaginationRange";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/products";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (data?.success) {
      console.log("All products", data?.data);
      setProducts(data?.data);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  // get pagination numbers
  const paginationRange = getPaginationRange(currentPage, totalPages);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 4000);
  // }, [currentPage]);

  return (
    <DefaultLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="pageTitle colorBlack">Shop</h1>
          </div>
          <div className="woocommerce-filters mb-4">
            <div className="woocommerce-breadcrumb">
              <nav aria-label="breadcrumb" className="themeBreadCrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item currentPage">
                    <Link to="/shop">Shop</Link>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="woocommerce-filtersDiv">
              <p className="woocommerce-result-count">
                Showing {indexOfFirstProduct + 1}–{indexOfLastProduct} of{" "}
                {products?.length} results
              </p>
              <select
                className="form-select woocommerce-ordering"
                aria-label="Woocommerce Ordering"
              >
                <option selected>Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="date">Sort by latest</option>
                <option value="price">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
              </select>
            </div>
          </div>
          {(isLoading || isPending) && <ScreenLoader />}

          {currentProducts.map((item, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <div className="productCard">
                <div className="productCardImg">
                  <img
                    key={item.images[0]}
                    src={`${import.meta.env.VITE_API_BASE_URL}/${
                      item.images[0]
                    }`}
                    alt={item.title}
                    className="img1 img-fluid"
                    loading="lazy"
                  />
                  {item.images.length > 1 && (
                    <img
                      key={item.images[1]}
                      src={`${import.meta.env.VITE_API_BASE_URL}/${
                        item.images[1]
                      }`}
                      alt={item.title}
                      className="img2 img-fluid"
                      loading="lazy"
                    />
                  )}

                  <Link to={`/product/${item.id}`} className="shopBtn">
                    Select Options
                  </Link>
                </div>
                <div className="productCardContent text-start">
                  <h4 className="productCardName">{item.title}</h4>
                  {/* <p className="productCardPrice">${item.price}</p> */}
                  <p
                    className="productCardPrice"
                    dangerouslySetInnerHTML={{ __html: item.price }}
                  />
                  {/* <button className="themeBtn">Add To Cart</button> */}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="col-12 d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination sassyPagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Previous
                  </button>
                </li>

                {paginationRange.map((page, i) =>
                  page === "..." ? (
                    <li key={i} className="page-item disabled">
                      <span className="page-link">…</span>
                    </li>
                  ) : (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Shop;
