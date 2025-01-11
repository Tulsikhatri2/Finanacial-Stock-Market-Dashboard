import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
// import ResetPasswordPage from "../Pages/Auth/ResetPasswordPage";
import Layout from "./Layout";
import PageNotFound from "../System/PageNotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";


const AppRoute = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth);

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user])

  return (
    <>
      {!user ? (
        <div>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      ) : (  
        <Layout />
     )} 
    </>
  );
};

export default AppRoute;
