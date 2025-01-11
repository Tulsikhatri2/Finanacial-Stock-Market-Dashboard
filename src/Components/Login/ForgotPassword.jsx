import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPasword } from "../../Redux/auth/authSlice";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";

// Use Yup Validation On Register Form
const validationSchema = yup.object({
  email: yup
    .string("Enter Your Email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");

  const CustomLabel = styled("label")(({ theme }) => ({
    fontSize: "1.3rem",
    color: "black",
    letterSpacing: ".1rem",
  }));

  // Formik Form In Material UI
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("values", values);
      dispatch(forgotPasword(values));
    },
  });


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ borderRadius: "0rem", backgroundColor: "#263238" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "50rem", height: "5rem" }}></Box>
        <DialogTitle>
          <Typography variant="h4" sx={{ fontWeight: "bold" , color:"#D4AF37"}}>
            {"Forgot Password"}
          </Typography>
        </DialogTitle>

        <form
          style={{ width: "100%", height: "90%" }}
          action=""
          onSubmit={formik.handleSubmit}
        >
          <DialogContent>
            <TextField
              type="email"
              fullWidth
              id="standard-basic"
              label={<CustomLabel>Enter Your Email</CustomLabel>}
              variant="standard"
              sx={{
                "& .MuiInputBase-input": {
                  color: "black",
                  fontSize: "1.4rem",
                },
              }}
          
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                fontSize: "1rem",
                borderRadius: "0rem",
                fontSize: "1.2rem",
                backgroundColor: "#D4AF37",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0c0a0a",
                  color: "#D4AF37",
                },
              }}
              type="submit"
          
            >
              Forgot Password
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ForgotPassword;
