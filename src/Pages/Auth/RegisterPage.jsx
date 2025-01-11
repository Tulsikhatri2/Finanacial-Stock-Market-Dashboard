import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUsers } from "../../Redux/auth/authSlice";
import Navbar from "../../Components/Navbar/Navbar";
import { toast } from "react-toastify";

// Use Yup Validation On Register Form
const validationSchema = yup.object({
  name: yup.string("Enter Your Name").required("Name is required"),
  email: yup
    .string("Enter Your Email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "password should be of minimum 8 characters length")
    .required("Password is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const CustomLabel = styled("label")(({ theme }) => ({
    fontSize: "1.3rem",
    color: "white",
    letterSpacing: ".1rem",
  }));

  // Formik Form In Material UI
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registerUsers(values));
    },
  });

  useEffect(() => {
    if (registerUser && isSuccess) {
      navigate("/email-verification");
    } else if (isError && message) {
      toast.error(message);
    }
  }, [registerUser, isSuccess, isError, message]);

  return (
    <>
      <Navbar />
      <Box className="register-page">
        <Box className="left-register"></Box>
        <Box className="right-register">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Card
                className="register-card"
                sx={{ paddingBlock: "1.5rem", paddingInline: "1rem" }}
              >
                <form
                  style={{ width: "100%", height: "90%" }}
                  action=""
                  onSubmit={formik.handleSubmit}
                >
                  <CardContent
                    sx={{
                      width: "100%",
                      height: "75%",
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
                      Sing Up
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <AccountCircleIcon
                        sx={{
                          color: "white",
                          mr: "1.5rem",
                          my: 0.5,
                          fontSize: "3rem",
                        }}
                      />
                      <TextField
                        label={<CustomLabel>Name</CustomLabel>}
                        variant="standard"
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white",
                            fontSize: "1.3rem",
                          },
                        }}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Box>
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
                            fontSize: "1.3rem",
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
                            mr: "1.5rem",
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
                      height: "25%",
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
                        borderRadius:"0rem"
                      }}
                      type="submit"
                    >
                      Register
                    </Button>
                  </CardActions>
                </form>
                <Box sx={{ width: "100%", height: "10%" }}>
                  <Typography align="center" variant="h6">
                    You have already account{" "}
                    <Link to={"/login"} className="link">
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Card>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
