<<<<<<< HEAD
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({Component}) => {
    const [user] = useAuthState(auth)
=======
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
>>>>>>> 5c07b1f223a546185b7fbebb61fc17bdbc3ccba3

  return <>{user ? <Component /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
