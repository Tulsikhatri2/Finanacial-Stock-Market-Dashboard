import React from "react";
import Sidebar from "../Components/Navbar/Sidebar";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserDetails from "../Pages/Users/UserDetails";
import CategoryAdd from "../Pages/Categories/CategoryAdd";
import CategoryDetails from "../Pages/Categories/CategoryDetails";
import CategoryUpdate from "../Pages/Categories/CategoryUpdate";
import CategoryList from "../Pages/Categories/CategoryList";
import ProductList from "../Pages/Products/ProductList";
import UserList from "../Pages/Users/UserList";
import UserUpdate from "../Pages/Users/UserUpdate";
import ProductDetails from "../Pages/Products/ProductDetails";
import ProductAdd from "../Pages/Products/ProductAdd";

const Layout = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
      }}
    >
      <Sidebar />
      <Box sx={{ width: "100%", height: "100%" }}>
        <Routes>
          {/* User Routes */}
          <Route
            path="/user-dashboard"
            element={<PrivateRoute Component={UserList} />}
          />
          <Route
            path="/user-details/:userId"
            element={<PrivateRoute Component={UserDetails} />}
          />
          <Route
            path="/user-update/:userId"
            element={<PrivateRoute Component={UserUpdate} />}
          />

          {/* Product Routes */}
          <Route
            path="/product-dashboard"
            element={<PrivateRoute Component={ProductList} />}
          />
           <Route
            path="/product-details/:_id"
            element={<PrivateRoute Component={ProductDetails} />}
          />
          <Route
            path="/product"
            element={<PrivateRoute Component={ProductAdd} />}
          />

          {/* Category Routes */}
          <Route
            path="/category-dashboard"
            element={<PrivateRoute Component={CategoryList} />}
          />
          <Route
            path="/category-details/:_id"
            element={<PrivateRoute Component={CategoryDetails} />}
          />
          <Route
            path="/category-update/:_id"
            element={<PrivateRoute Component={CategoryUpdate} />}
          />
          <Route
            path="/category"
            element={<PrivateRoute Component={CategoryAdd} />}
          />
        </Routes>
      </Box>
    </div>
  );
};

export default Layout;
