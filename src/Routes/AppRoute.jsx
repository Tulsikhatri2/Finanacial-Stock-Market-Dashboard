import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import ResetPasswordPage from "../Pages/Auth/ResetPasswordPage";
import EmailVerification from "../Pages/Auth/EmailVerification";
// import Sidebar from "../Components/Navbar/Sidebar";
// import UsersDashboard from "../Pages/Users/UsersDashboard";
// import ProductsDashboard from "../Pages/Products/ProductsDashboard";
// import CategoriesDashboard from "../Pages/Categories/CategoriesDashboard";
// import { Box } from "@mui/material";
// import PrivateRoute from "./PrivateRoute";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import PageNotFound from "../System/PageNotFound";

const AppRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userToken){
      navigate("/login")
    }
  },[userToken])

  return (
    <>
      {!userToken ? (
        <div>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/reset-password/:id/:token" element={<ResetPasswordPage />} />
            <Route path="/email-verification" element={<EmailVerification />} />
          </Routes>
        </div>
      ) : (
        <Layout />
      )}
    </>
  );
};

export default AppRoute;
