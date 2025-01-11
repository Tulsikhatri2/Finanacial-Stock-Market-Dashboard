import React from "react";
import Sidebar from "../Components/Navbar/Sidebar";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Dashboard from "../Pages/Dashboard";
import News from "../Pages/News";
import Portfolio from "../Pages/Portfolio";

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
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
          <Route
            path="/news"
            element={<PrivateRoute Component={News} />}
          />
          <Route
            path="/portfolio"
            element={<PrivateRoute Component={Portfolio} />}
          />
        </Routes>
      </Box>
    </div>
  );
};

export default Layout;
