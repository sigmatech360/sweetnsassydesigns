import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import {
  FaEnvelope,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="pageTitle colorBlack">My wishlist</h1>
            </div>
            <div className="col-md-12">
              {wishlistItems.length === 0 ? (
                <p className="text-center py-5">No items in your wishlist.</p>
              ) : (
                <div className="wishlistData mb-5">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="product-remove"></th>
                        <th scope="col" className="product-thumbnail"></th>
                        <th scope="col" className="product-name">Product name</th>
                        <th scope="col" className="product-price">Unit price</th>
                        <th scope="col" className="product-stock-status">
                          Stock status
                        </th>
                        <th scope="col" className="product-add-to-cart"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistItems.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">
                            <button
                              className="wishlistData-removeBtn"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              X
                            </button>
                          </th>
                          <td>
                            <img
                              src={item.productImages?.front || item.img}
                              className="wishlist-thumbnail"
                              alt={item.name}
                            />
                          </td>
                          <td className="text-start">
                            <Link className="product-detail" to={`/product/${item.id}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td>${item.price}</td>
                          <td className="colorGreen">In Stock</td>
                          <td>
                            <Link to={`/product/${item.id}`}>Select Options</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="socialIcons">
                <h4 className="socialIconsTitle">Share on:</h4>
                <div className="socialIconList">
                  <a href="#" className="social-icon social-fb"><FaFacebookF /></a>
                  <a href="#" className="social-icon social-x"><FaXTwitter /></a>
                  <a href="#" className="social-icon social-pinterest"><FaPinterestP /></a>
                  <a href="#" className="social-icon social-envelop"><FaEnvelope /></a>
                  <a href="#" className="social-icon social-whatsapp"><FaWhatsapp /></a>
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
