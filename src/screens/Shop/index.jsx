import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { shopPageProducts } from "../../data";
import { getPaginationRange } from "../../helper/getPaginationRange";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = shopPageProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(shopPageProducts.length / productsPerPage);

  // get pagination numbers
  const paginationRange = getPaginationRange(currentPage, totalPages);

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
                  Showing 1–12 of 1685 results
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

            {currentProducts.map((item, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index}>
                <div className="productCard">
                  <div className="productCardImg">
                    <img
                      src={item.productImages.front}
                      alt={item.name}
                      className="img1 img-fluid"
                    />
                    <img
                      src={item.productImages.back}
                      alt={item.name}
                      className="img2 img-fluid"
                    />
                    <Link to={`/product/${item.id}`} className="shopBtn">Select Options</Link>
                  </div>
                  <div className="productCardContent text-start">
                    <h4 className="productCardName">{item.name}</h4>
                    <p className="productCardPrice">${item.price}</p>
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
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
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
