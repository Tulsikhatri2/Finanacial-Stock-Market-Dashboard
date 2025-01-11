import React, { useState } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/auth/authSlice";
import { useParams } from "react-router-dom";
import BackBtn from "../../Components/Button/BackBtn";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  // const params = useParams();

  const { token, id } = useParams();
  console.log(token, id, "35346457568");

  // Reset Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password: password,
        token: token,
        userId: id,
      })
    );
  };

  const CustomLabel = styled("label")(({ theme }) => ({
    fontSize: "1.5rem",
    color: "white",
    letterSpacing: ".2rem",
  }));
  return (
    <>
      <Navbar />
      <Box className="reset-password-page">
        <Box className="left-reset-password"></Box>
        <Box className="right-reset-password">
          <Card
            className="reset-password-card"
            sx={{ paddingBlock: "1.5rem", paddingInline: "1rem" }}
          >
            <BackBtn Location={'/login'}/>
            <CardContent
              sx={{
                width: "100%",
                height: "80%",
                display: "flex",
                alignItems: "start",
                justifyContent: "space-around",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ letterSpacing: 3 }}
                color="white"
                gutterBottom
                variant="h4"
              >
                Reset Password
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-center",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                {showPassword ? (
                  <VisibilityOff
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ color: "white", mr: 1, my: 0.5, fontSize: "3rem" }}
                  />
                ) : (
                  <Visibility
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ color: "white", mr: 1, my: 0.5, fontSize: "3rem" }}
                  />
                )}

                <TextField
                  label={<CustomLabel>Password</CustomLabel>}
                  variant="standard"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  sx={{
                    color: "white",

                    "& .MuiInputBase-input": {
                      color: "white",
                      fontSize: "1.5rem",
                    },
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-center",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                {showPassword ? (
                  <VisibilityOff
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ color: "white", mr: 1, my: 0.5, fontSize: "3rem" }}
                  />
                ) : (
                  <Visibility
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ color: "white", mr: 1, my: 0.5, fontSize: "3rem" }}
                  />
                )}

                <TextField
                  label={<CustomLabel>Confirm Password</CustomLabel>}
                  variant="standard"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  sx={{
                    color: "white",

                    "& .MuiInputBase-input": {
                      color: "white",
                      fontSize: "1.5rem",
                    },
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{
                width: "100%",
                height: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "column",
              }}
            >
              <Button
                size="small"
                variant="contained"
                fullWidth
                sx={{
                  paddingBlock: "1rem",
                  fontSize: "1.4rem",
                  backgroundColor: "#D4AF37",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0c0a0a",
                    color: "white",
                  },
                }}
                type="submit"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordPage;
