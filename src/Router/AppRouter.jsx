import { Routes, Route } from "react-router-dom";

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
import MyAccount from "../screens/MyAccount/MyAccount";
import ProductDetail from "../screens/ProductDetail";
import ProtectedRoute from "./ProtectedRoute";
import LostPassword from "../screens/LostPassword";
import ChangePassword from "../screens/ChangePassword";

const AppRouter = () => {
  return (
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
      <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>}/>
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/lost-password" element={<LostPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRouter;
