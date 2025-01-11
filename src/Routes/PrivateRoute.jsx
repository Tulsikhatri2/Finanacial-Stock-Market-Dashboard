import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({Component}) => {
    const {userToken}= useSelector(state=>state.auth);
    const navigate = useNavigate()

    useEffect(()=>{
      if(!userToken){
        navigate("/login")
      }
    },[userToken])

  return (
    <>
    {
        userToken ? <Component/> : <Navigate to="/login" />
    }
    </>
  )
}

export default PrivateRoute;
