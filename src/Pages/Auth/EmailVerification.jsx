import React, { useEffect } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import emailverificationImg from "../../assets/Img/email-verification.png";
import { useDispatch, useSelector } from "react-redux";
import { emailVerification } from "../../Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {verificationMessage,isSuccess, isError, message, registerUser } = useSelector((state) => state.auth);

  const data = {
    token: registerUser.emailVerificationTOken,
    id: registerUser.id,
  };


  const verifyEmail = (data) => {
    dispatch(emailVerification(data));
    toast.success(verificationMessage);
  };

  useEffect(()=>{
    if(verificationMessage && isSuccess){
      navigate('/login')
    }else if(isError && message){
     toast.error(message);
    }
  },[verificationMessage, isSuccess, isError, message])

  return (
    <>
    <Navbar/>
      <Box className="email-verification-page">
        <Box className="right-email-verification">
          <Card className="verification-form" sx={{ padding: "2rem" }}>
            <Typography
              variant="h3"
              textAlign={"center"}
              sx={{ padding: "1rem", fontWeight: "bold", color: "white" }}
            >
              {" "}
              <span style={{ color: "#D4AF37" }}>Flavor</span>Fusion
            </Typography>
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight={"bold"}
              sx={{ color: "#bdbdbd" }}
            >
              Verify Your Email Address
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBlock: "1rem",
              }}
            >
              <Box sx={{ width: "10rem", height: "10rem" }}>
                <img
                  src={emailverificationImg}
                  alt="no"
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
            </Box>
            <Typography
              variant="h6"
              textAlign={"center"}
              fontWeight={"bold"}
              sx={{ color: "#bdbdbd", marginBlock: "2rem" }}
            >
              Please confirm that you want to use this as your FlavorFusion
              account email address. Once it's done you will be able start
              selling
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBlock: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ paddingBlock: "1.2rem", fontSize: "1.4rem" }}
                onClick={() => verifyEmail(data)}
              >
                Verify my email
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default EmailVerification;
