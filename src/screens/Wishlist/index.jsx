import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";

import orderSummeryImg from "../../assets/images/orderSummeryImg.png";
import {
  FaEnvelope,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const wishlistData = [
  {
    id: 1,
    name: "2023 Mermaid Princesses",
    price: "$5.00 – $8.50",
    stock: "In Stock",
    img: orderSummeryImg,
  },
  {
    id: 2,
    name: "Frozen Elsa Doll",
    price: "$10.00 – $12.50",
    stock: "In Stock",
    img: orderSummeryImg,
  },
  {
    id: 3,
    name: "Barbie Collection",
    price: "$15.00 – $20.00",
    stock: "Out of Stock",
    img: orderSummeryImg,
  },
];

const Wishlist = () => {
  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="pageTitle colorBlack">My wishlist</h1>
            </div>
            <div className="col-md-12">
              <div className="wishlistData mb-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" className="product-remove"></th>
                      <th scope="col" className="product-thumbnail"></th>
                      <th scope="col" className="product-name">
                        Product name{" "}
                      </th>
                      <th scope="col" className="product-price">
                        Unit price
                      </th>
                      <th scope="col" className="product-stock-status">
                        Stock status{" "}
                      </th>
                      <th scope="col" className="product-add-to-cart"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistData.map((item) => (
                      <tr key={item.id}>
                        <th scope="row">
                          <button className="wishlistData-removeBtn">X</button>
                        </th>
                        <td>
                          <img
                            src={item.img}
                            className="wishlist-thumbnail"
                            alt={item.name}
                          />
                        </td>
                        <td className="text-start">
                          <Link className="product-detail" to={""}>
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.price}</td>
                        <td
                          className={
                            item.stock === "In Stock"
                              ? "colorGreen"
                              : "colorRed"
                          }
                        >
                          {item.stock}
                        </td>
                        <td>
                          <Link>Select Options</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="socialIcons">
                <h4 className="socialIconsTitle">Share on:</h4>
                <div className="socialIconList">
                  <a href="javascript:;" className="social-icon social-fb">
                    <FaFacebookF />
                  </a>
                  <a href="javascript:;" className="social-icon social-x">
                    <FaXTwitter />
                  </a>
                  <a href="javascript:;" className="social-icon social-pinterest">
                    <FaPinterestP />
                  </a>
                  <a href="javascript:;" className="social-icon social-envelop">
                    <FaEnvelope />
                  </a>
                  <a href="javascript:;" className="social-icon social-whatsapp">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Wishlist;
