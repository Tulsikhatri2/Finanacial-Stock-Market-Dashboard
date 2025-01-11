import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Routes/AppRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoute />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
