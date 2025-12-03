import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { newDesignProducts, shopOurProducts } from "../../data";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../../api/products";

const Home = () => {
  const { addToCart } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState([]);

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: getFeaturedProducts,
  });

  useEffect(() => {
    if (data?.success) {
      console.log("featured products", data?.data);
      setFeaturedProducts(data?.data);
    }
  }, [data]);

  return (
    <DefaultLayout>
      <section className="newDesignSec">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="secHead">
                <h2 className="secTitle colorBlue">New Designs</h2>
              </div>
            </div>
            {featuredProducts.map((item, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index}>
                <div className="productCard">
                  <Link className="productcard-link" to={`/product/${item.id}`}>
                    <div className="productCardImg">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${
                          item.images[0]
                        }`}
                        alt={item.title}
                        className="img1 img-fluid"
                      />
                      {item.images.length > 1 && (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/${
                            item.images[1]
                          }`}
                          alt={item.title}
                          className="img2 img-fluid"
                        />
                      )}
                    </div>{" "}
                  </Link>
                  <div className="productCardContent">
                    <h4 className="productCardName">{item.title}</h4>
                    <p
                      className="productCardPrice"
                      dangerouslySetInnerHTML={{ __html: item.price }}
                    />
                    <button
                      className="themeBtn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newDesignSec">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="secHead">
                <h2 className="secTitle colorBlue">Shop Our Products</h2>
              </div>
            </div>
            {shopOurProducts?.map((item, index) => (
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
                  </div>
                  <div className="productCardContent">
                    <h4 className="productCardName">
                      {item.name} {item.count && <span>({item.count})</span>}
                    </h4>
                    <p className="productCardPrice">${item.price}</p>
                    <button
                      className="themeBtn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="newDesignSec">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="secHead">
                <h2 className="secTitle colorBlue">Follow us on Instagram</h2>
                <h4 className="instaLink">
                  @
                  <a
                    href="https://www.instagram.com/sweetnsassyllc/"
                    target="_blank"
                  >
                    sweetnsassyllc
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Home;
