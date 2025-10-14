import React, { useRef, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import { shopPageProducts } from "../../data";
import { useCart } from "../../context/CartContext";
import { RiAwardFill } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Slider from "react-slick";
import { IoSearch } from "react-icons/io5";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToWishlist, isInWishlist } = useWishlist();
  const product = shopPageProducts.find(
    (p) => p.id.toString() === productId.toString()
  );

  if (!product) {
    return (
      <DefaultLayout>
        <div className="container text-center py-5">
          <h2>Product not found</h2>
          <Link to="/shop" className="themeBtn mt-3">
            Back to Shop
          </Link>
        </div>
      </DefaultLayout>
    );
  }

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const [mainImage, setMainImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const imgRef = useRef(null);
  const images = [
    product.productImages.front,
    product.productImages.back,
    product.productImages.side1,
    product.productImages.side2,
  ].filter(Boolean);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  const sliderSettings = {
    slidesToShow: Math.min(images.length, 4),
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    focusOnSelect: true,
  };

  return (
    <DefaultLayout>
      <section className="product-detail-breabcrumb">
        <div className="container">
          <nav aria-label="breadcrumb" className="themeBreadCrumb mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="product-detail-sec">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-5 col-md-6">
              <div className="product-detail-image">
                <div className="main-image-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                  <a
                    // href={mainImage || images[0]}
                    data-fancybox="gallery"
                    data-caption={product.name}
                  >
                    <img ref={imgRef}
                      src={mainImage || images[0]}
                      alt={product.name}
                      className="mainImage img-fluid rounded shadow-sm"
                      style={zoomStyle}
                    />
                  </a>
                  <button className="zoom-icon-btn"
                    onClick={() =>
                      Fancybox.show(
                        images.map((img) => ({
                          src: img,
                          type: "image",
                          caption: product.name,
                        })),
                        {
                          startIndex: images.indexOf(mainImage || images[0]),
                        }
                      )
                    }
                  >
                    <IoSearch size={22} />
                  </button>
                </div>
                <div className="thumbnail-slider mt-3">
                  <Slider {...sliderSettings}>
                    {images.map((img, index) => (
                      <div key={index} className="thumb-wrapper" onClick={() => setMainImage(img)}>
                        <a data-fancybox="gallery" data-caption={product.name}>
                          <img src={img} alt="product thumbnail" className={`thumb-img ${
                              (mainImage || images[0]) === img ? "active" : ""
                            }`}
                          />
                        </a>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-6">
              <div className="product-detail-txt">
                <h2>{product.name}</h2>
                <p className="priceRange">${product.price} {product.priceRange && <span> – ${product.priceRange}</span>}</p>
                <div className="purchase-item-point">
                  <p><RiAwardFill /> Purchase this item and get{" "}<strong>5-8 Points</strong> - a worth of{" "}<span>$0.50-$0.80</span></p>
                </div>

                <div className="product-size">
                  <label htmlFor="optionSelect">Hoop Sizes & Cut Files</label>
                  <select id="optionSelect">
                    <option>Choose an option</option>
                    <option>4x4 inch</option>
                    <option>5x7 inch</option>
                    <option>6x10 inch</option>
                  </select>
                </div>
                <div className="product-counter">
                  <button className="" onClick={handleDecrease}> - </button>
                  <span className="product-quantity">{quantity}</span>
                  <button className="" onClick={handleIncrease}> + </button>
                </div>
                <div className="cart-wishlist-btn">
                  <button className="cartbtn" onClick={handleAddToCart}> Add to Cart </button>
                  <button className="wishlistbtn" onClick={() => { 
                    if (isInWishlist(product.id)) {navigate("/wishlist"); } else { addToWishlist(product);}}}>
                    {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}{" "}
                    {isInWishlist(product.id) ? "Browse Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
                <div className="sku-categories-tags">
                  <p className="product-sku">SKU: 165fd62466f6-1-1-1-1-1</p>
                  <p className="product-categories">
                    Categories: <a href="#">Movie Character Designs</a>,{" "}
                    <a href="#">New Releases</a>
                  </p>
                  <p className="product-tags">Tags: <a href="#">2023</a>, <a href="#">Ariel</a>,{" "} <a href="#">Little Mermaid</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="additional-information">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="description-additional-tabs">
                <Tabs>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Additional information</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="description-tab-text">
                      <h3>2023 Mermaid Princesses</h3>
                      <p>This listing includes the 2023 Mermaid Princess &
                        Mermaid Princess with Flower Embroidery Design2. This is
                        not a finished product, but only the digitized designs.
                        Any photos of finished products associated with this
                        post are for inspiration purposes only.</p>
                      <p>The zipped file includes a color layout (sequence chart), as well as the following formats:</p>
                      <p>
                        DST, EXP, HUS, JEF, JEF+, PES, VIP, VIP3, XXX, & SEW
                      </p>
                      <p>If there is a different file format needed, please message the seller.</p>
                      <p>All vinyl used in the stock photos is from{" "} <a href="">Sweet n Sassy Blanks & Such.</a>
                      </p>
                      <h6>***These designs are in no way affiliated with any other characters and their resemblance to any is merely coincidental***</h6>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="additional-information-text">
                      <table className="additional-information-table">
                        <tbody>
                          <tr>
                            <th>Hoop Sizes & Cut Files</th>
                            <td>
                              <p>
                                4×4 Design, 5×7 Design, Both 4×4 and 5×7 Designs
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="relatedProducts mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="related-prod-head">
                <h3 className="mb-4">Related Products</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {shopPageProducts.slice(0, 4).map((item, index) => (
              <div className="col-lg-3 col-md-4 mb-4" key={index}>
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
                    <Link to={`/product/${item.id}`} className="shopBtn">
                      Select Options
                    </Link>
                  </div>
                  <div className="productCardContent text-start">
                    <h4 className="productCardName">{item.name}</h4>
                    <p className="productCardPrice">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ProductDetail;
