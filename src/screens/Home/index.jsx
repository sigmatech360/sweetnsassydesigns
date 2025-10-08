import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { newDesignProducts, shopOurProducts } from "../../data";
import { Link } from "react-router-dom";

const Home = () => {
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
              {newDesignProducts.map((item, index) => (
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
                      <h4 className="productCardName">{item.name}</h4>
                      <p className="productCardPrice">${item.price}</p>
                      <button className="themeBtn">Add To Cart</button>
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
              {shopOurProducts.map((item, index) => (
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
                      <button className="themeBtn">Add To Cart</button>
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
