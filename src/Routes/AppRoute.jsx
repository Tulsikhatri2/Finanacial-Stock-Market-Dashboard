import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import News from "../Pages/News";
import Portfolio from "../Pages/Portfolio";
import { Box } from "@mui/material";
import Sidebar from "../Components/Navbar/Sidebar";
import Dashboard from "../Pages/Dashboard";

const AppRoute = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth);


  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      ) : (
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Box>
    </div>
      )}
    </>
  );
};

export default AppRoute;
