import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({Component}) => {
    const [user] = useAuthState(auth)

  return (
    <>
    {
        user ? <Component/> : <Navigate to="/login" />
    }
    </>
  )
}

export default PrivateRoute;
