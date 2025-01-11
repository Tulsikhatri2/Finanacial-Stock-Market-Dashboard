import React from "react";
import Sidebar from "../Components/Navbar/Sidebar";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"

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
          {/* <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          /> */}
          {/* <Route
            path="/user-details/:userId"
            element={<PrivateRoute Component={UserDetails} />}
          /> */}
          {/* <Route
            path="/user-update/:userId"
            element={<PrivateRoute Component={UserUpdate} />}
          /> */}

          {/* Product Routes */}
          {/* <Route
            path="/product-dashboard"
            element={<PrivateRoute Component={ProductList} />}
          /> */}
           {/* <Route
            path="/product-details/:_id"
            element={<PrivateRoute Component={ProductDetails} />}
          /> */}
          {/* <Route
            path="/product"
            element={<PrivateRoute Component={ProductAdd} />}
          /> */}

          {/* Category Routes */}
          {/* <Route
            path="/category-dashboard"
            element={<PrivateRoute Component={CategoryList} />}
          />
          <Route
            path="/category-details/:_id"
            element={<PrivateRoute Component={CategoryDetails} />}
          /> */}
          {/* <Route
            path="/category-update/:_id"
            element={<PrivateRoute Component={CategoryUpdate} />}
          />
          <Route
            path="/category"
            element={<PrivateRoute Component={CategoryAdd} />}
          /> */}
        </Routes>
      </Box>
    </div>
  );
};

export default Layout;
