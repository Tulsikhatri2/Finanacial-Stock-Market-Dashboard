import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoute = ({ Component }) => {
  // const navigate = useNavigate();
  const [user] = useAuthState(auth);
  // const token = localStorage.getItem("token")

  // useEffect(()=>{
  //   if(!token){
  //     navigate("/login")
  //   }
  // },[token])

  return <>{user ? <Component /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
