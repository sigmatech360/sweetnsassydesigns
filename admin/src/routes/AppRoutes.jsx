// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { sidebarData } from "../data/Data";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import CategoryTable from "../Pages/Categories/CategoryTable";
import AddCategory from "../Pages/Categories/AddCategory";
import SubcategoryTable from "../Pages/Categories/SubcategoryTable";
import EditCategory from "../Pages/Categories/EditCategory";
import Dashboard from "../Pages/Dashboard";
import AttributeTable from "../Pages/Attributes/AttributeTable";
import EditAttribute from "../Pages/Attributes/EditAttributes";
import AddAttribute from "../Pages/Attributes/AddAttribute";
import ProductTable from "../Pages/Products/ProductTable";
import AddProduct from "../Pages/Products/AddProduct";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap ALL routes inside ProtectedRoute */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Routes>
              {/* Default */}
              {/* <Route path="/" element={<Dashboard/>} /> */}
              {/* Categories */}
              <Route path="/categories/list" element={<CategoryTable />} />
              <Route path="/categories/add" element={<AddCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              <Route
                path="/categories/subcategory/list/:id"
                element={<SubcategoryTable />}
              />
              {/* Attribute */}
              <Route path="/attributes/list" element={<AttributeTable />} />
              <Route path="/attribute/add" element={<AddAttribute />} />
              <Route path="/attribute/edit/:id" element={<EditAttribute />} />

              {/* ProductS */}
              <Route path="/products/list" element={<ProductTable />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/edit/:id" element={<EditAttribute />} />
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
