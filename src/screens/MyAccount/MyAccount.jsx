import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import DashboardContent from "../../components/webcomponents/DashboardContent";
import OrdersContent from "../../components/webcomponents/OrdersContent";
import DownloadsContent from "../../components/webcomponents/DownloadsContent";
import AddressesContent from "../../components/webcomponents/AddressesContent";
import PaymentMethodsContent from "../../components/webcomponents/PaymentMethodsContent";
import AccountDetailsContent from "../../components/webcomponents/AccountDetailsContent";
import MyPointsContent from "../../components/webcomponents/MyPointsContent";
import { RiDashboard3Fill } from "react-icons/ri";
import { PiBasketFill } from "react-icons/pi";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { HiMiniHome } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";
import { FaRegFileAlt, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const MyAccount = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const { logout } = useAuth();


  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <DefaultLayout>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="myaccount-items">
                <ul>
                  <li  className={selectedMenu === "dashboard" ? "active" : ""} onClick={() => handleMenuClick("dashboard")}><RiDashboard3Fill /> Dashboard</li>
                  <li  className={selectedMenu === "orders" ? "active" : ""} onClick={() => handleMenuClick("orders")}><PiBasketFill /> Orders</li>
                  <li  className={selectedMenu === "downloads" ? "active" : ""} onClick={() => handleMenuClick("downloads")}><LiaFileDownloadSolid /> Downloads</li>
                  <li  className={selectedMenu === "addresses" ? "active" : ""} onClick={() => handleMenuClick("addresses")}><HiMiniHome /> Addresses</li>
                  <li  className={selectedMenu === "paymentMethods" ? "active" : ""} onClick={() => handleMenuClick("paymentMethods")}><MdPayment /> Payment methods</li>
                  <li  className={selectedMenu === "accountDetails" ? "active" : ""} onClick={() => handleMenuClick("accountDetails")}><FaUser /> Account details</li>
                  <li  className={selectedMenu === "myPoints" ? "active" : ""} onClick={() => handleMenuClick("myPoints")}><FaRegFileAlt /> My Points</li>
                  <li  className={selectedMenu === "logout" ? "active" : ""} onClick={logout}><HiOutlineLogout /> Log out</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">  
              <div className="page-content">
                {selectedMenu === "dashboard" && <DashboardContent handleMenuClick={handleMenuClick} />}
                {selectedMenu === "orders" && <OrdersContent />}
                {selectedMenu === "downloads" && <DownloadsContent />}
                {selectedMenu === "addresses" && <AddressesContent />}
                {selectedMenu === "paymentMethods" && <PaymentMethodsContent />}
                {selectedMenu === "accountDetails" && <AccountDetailsContent />}
                {selectedMenu === "myPoints" && <MyPointsContent />}
              </div>
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default MyAccount;
