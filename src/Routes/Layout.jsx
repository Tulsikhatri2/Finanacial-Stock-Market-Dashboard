import React from "react";
import Sidebar from "../Components/Navbar/Sidebar";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute"
=======
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Portfolio from "../Pages/Portfolio";
import News from "../Pages/News";
>>>>>>> 5c07b1f223a546185b7fbebb61fc17bdbc3ccba3

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
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
<<<<<<< HEAD
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
=======
          <Route
            path="/portfolio"
            element={<PrivateRoute Component={Portfolio} />}
          />
          <Route path="/news" element={<PrivateRoute Component={News} />} />
>>>>>>> 5c07b1f223a546185b7fbebb61fc17bdbc3ccba3
        </Routes>
      </Box>
    </div>
  );
};

export default Layout;
