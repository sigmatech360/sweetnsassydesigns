import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { newDesignProducts, shopOurProducts } from "../../data";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="themeBreadCrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Library</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Data
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-12">
            <h1 className="pageTitle">Home</h1>
          </div>
        </div>
        <section className="newDesignSec">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="secHead">
                  <h2 className="secTitle colorBlue">New Designs</h2>
                </div>
              </div>
              {newDesignProducts.map((item, index) => (
                <div className="col-lg-3 mb-4" key={index}>
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
                <div className="col-lg-3 mb-4" key={index}>
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
      </main>
    </DefaultLayout>
  );
};

export default Home;
