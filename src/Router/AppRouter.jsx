import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "../screens/Home";
import NeedSheets from "../screens/NeedSheets";
import ContactUs from "../screens/ContactUs";
import Login from "../screens/Login";
import Shop from "../screens/Shop";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Wishlist from "../screens/Wishlist";
import Balance from "../screens/Balance";
import MyAcocunt from "../screens/MyAccount/MyAcocunt";
import ProductDetail from "../screens/ProductDetail";

// Import your components/pages

const AppRouter = () => {
  return (
    <Router basename="/sweetnsassydesigns">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/need-sheets" element={<NeedSheets />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/my-account" element={<MyAcocunt />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;