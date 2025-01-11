import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
// import HomePage from "../Pages/Home/HomePage";
>>>>>>> 5c07b1f223a546185b7fbebb61fc17bdbc3ccba3
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
// import ResetPasswordPage from "../Pages/Auth/ResetPasswordPage";
import Layout from "./Layout";
import PageNotFound from "../System/PageNotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const AppRoute = () => {
<<<<<<< HEAD
  const navigate = useNavigate()
  const [user] = useAuthState(auth);

  useEffect(()=>{
    if(!user){
      navigate("/login")
=======
  const navigate = useNavigate();
  // const token = localStorage.getItem("token")
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
>>>>>>> 5c07b1f223a546185b7fbebb61fc17bdbc3ccba3
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <div>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
<<<<<<< HEAD
            <Route path="/login" element={<LoginPage />} />
=======
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<LoginPage />} />
>>>>>>> 5c07b1f223a546185b7fbebb61fc17bdbc3ccba3
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
