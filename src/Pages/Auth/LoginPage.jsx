import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Navbar from "../../Components/Navbar/Navbar";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

const validationSchema = yup.object({
  email: yup
    .string("Enter Your Email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const CustomLabel = styled("label")(({ theme }) => ({
    fontSize: "1.5rem",
    color: "white",
    letterSpacing: ".2rem",
  }));

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (err) {
        alert(err.message);
      }
    },
  });

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google Sign-in:", error.message);
    }
  };


  return (
    <>
      <Navbar />
      <Box className="login-page" sx={{backgroundColor:"black"}}>
        <Box className="left-login"></Box>
        <Box className="right-login">
              <Card
                className="login-card"
                sx={{ borderRadius: "0rem", paddingBlock: "1.5rem", paddingInline: "1rem" }}
              >
                <form
                  style={{ width: "100%", height: "85%" }}
                  action=""
                  onSubmit={formik.handleSubmit}
                >
                  <CardContent
                    sx={{
                      width: "100%",
                      height: "58%",
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-around",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        letterSpacing: 3,
                        color: "white",
                        fontSize: "2.5vh",
                        fontWeight: "bold"
                      }}
                    >
                      Log In
                    </p>

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <AttachEmailIcon
                        sx={{
                          color: "white",
                          mr: "1.5rem",
                          my: 0.5,
                          fontSize: "3rem",
                        }}
                      />
                      <TextField
                        label={<CustomLabel>Email</CustomLabel>}
                        variant="standard"
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white",
                            fontSize: "1.4rem",
                          },
                        }}
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-center",
                        justifyContent: "center",
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOff
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{
                            color: "white",
                            mr: "1.3rem",
                            my: 0.5,
                            fontSize: "3rem",
                          }}
                        />
                      ) : (
                        <Visibility
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{
                            color: "white",
                            mr: "1.5rem",
                            my: 0.5,
                            fontSize: "3rem",
                          }}
                        />
                      )}

                      <TextField
                        label={<CustomLabel>Password</CustomLabel>}
                        variant="standard"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "green",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                            fontSize: "1.3rem",
                          },
                        }}
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      width: "100%",
                      height: "35%",
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
                        paddingBlock: "0.7rem",
                        fontSize: "1.3rem",
                        backgroundColor: "#D4AF37",
                        color: "black",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#0c0a0a",
                          color: "white",
                        },
                        borderRadius: "0rem"
                      }}
                      type="submit"
                    >
                      Login
                    </Button>
                    <div style={{width:"2.5vw", height:"5vh", backgroundColor:"white",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      borderRadius:"50%", cursor:"pointer"}}
                      onClick={handleGoogleLogin}>
                    <FcGoogle size={25}/>
                    </div>
                  </CardActions>
                 
                </form>
                
                <Box
                  sx={{
                    width: "100%",
                    height: "8%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <Typography align="center" variant="h6">
                    You have already account{" "}
                    <Link to={"/register"} className="link">
                      Register
                    </Link>
                  </Typography>
                  
                </Box>
              </Card>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
