import React from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CssBaseline,
  Drawer,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../../Components/Loading/CircularLoader";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../Components/Button/BackBtn";
import { createCategory } from "../../Redux/Categories/categoriesSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

// Use Yup Validation On Login Form
const validationSchema = yup.object({
  name: yup.string("Enter Category Name").required("Category name is required"),
  status: yup.string("Category Status").required("Category status is required"),
});

const CategoryAdd = () => {
  // Hook Call
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const [isClosing, setIsClosing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // Formik Form In Material UI Create Category
  const formik = useFormik({
    initialValues: {
      name: "",
     status: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(values)
      dispatch(createCategory(values));
      toast.success("Successfully Create Category!!");
      // navigate("/category-dashboard");
    },
  });

  // Categary State Define
  const [categoryData, setCategoryData] = useState({
    name: "",
    status: "",
  });
  const { name, status } = categoryData;

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  // Create and Update Category
  //  const handleCreateCategory = (e) => {
  //   e.preventDefault();
  //   console.log("Create Category!!")
  //   dispatch(createCategory(categoryData));
  //   toast.success("Successfully Create Category!!");
  //   setCategoryData({
  //     name: "",
  //     status: "",
  //   });
  //   navigate('/category-dashboard')
  // }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "#0c0a0a",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          ml: {
            width: "100%",
            height: "8rem",
            backgroundColor: "#0c0a0a",
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            align="right"
            sx={{ width: "37%", color: "white", fontFamily: "Philosopher, sans-serif", }}
          >
            CATEGORY ADD
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        ></Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
          open
        ></Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderLeft: "none",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0c0a0a",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", paddingInline: "3rem" }}>
            <Box
              sx={{
                width: "100%",
                height: "20%",
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.4rem",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                  fontFamily: "Philosopher, sans-serif",
                }}
              >
                <HomeIcon
                  sx={{
                    color: "white",
                    fontSize: "3.5rem",
                    marginRight: "1rem",
                  }}
                />{" "}
                / Categories / Add Category
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "80%",
                overflowY: "scroll",
              }}
            >
              {isLoading ? (
                <>
                  <CircularLoader />
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      height: "85%",
                      minWidth: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      sx={{
                        width: "40%",
                        height: "70%",
                        backgroundColor: "white",
                        borderRadius: "0rem",
                      }}
                    >
                      <BackBtn Location={"/category-dashboard"} />
                      <Paper
                        sx={{
                          width: "100%",
                          height: "80%",
                          borderRadius: "0rem",
                          paddingBlock: "3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingInline: "5rem",
                        }}
                      >
                        <form
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            flexDirection: "column",
                          }}
                          action=""
                          onSubmit={formik.handleSubmit}
                        >
                          <TextField
                            placeholder="Enter Category Name"
                            fullWidth
                            required
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#212121",
                                },
                              },
                              "& .MuiInputBase-input": {
                                color: "#424242",
                                fontSize: "1.4rem",
                                fontFamily: "Philosopher, sans-serif",
                              },
                            }}
                            // name="name"
                            // value={name}
                            // onChange={handleChange}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.name && Boolean(formik.errors.name)
                            }
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
                          />
                          <Select
                            fullWidth
                            required
                            sx={{
                              color: "#424242",
                              fontFamily: "Philosopher, sans-serif",
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#424242",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#212121",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#212121",
                                },
                              },
                              "& .MuiSelect-select": {
                                fontSize: "1.4rem",
                                fontFamily: "Philosopher, sans-serif",
                                color: "#424242",
                              },
                            }}
                            // name="status"
                            // value={status}
                            // onChange={handleChange}
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.status &&
                              Boolean(formik.errors.status)
                            }
                            helperText={
                              formik.touched.status && formik.errors.status
                            }
                          >
                            <MenuItem
                              value={true}
                              sx={{ fontSize: "1.4rem", color: "#424242", fontFamily: "Philosopher, sans-serif", }}
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              value={false}
                              sx={{ fontSize: "1.4rem", color: "#424242", fontFamily: "Philosopher, sans-serif", }}
                            >
                              Inactive
                            </MenuItem>
                          </Select>

                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              paddingBlock: "1rem",
                              fontSize: "1.4rem",
                              backgroundColor: "#D4AF37",
                              fontFamily: "Philosopher, sans-serif",
                              color: "black",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#0c0a0a",
                                color: "white",
                              },
                            }}
                            type="submit"
                            // onClick={handleCreateCategory}
                          >
                            Create
                          </Button>
                        </form>
                      </Paper>
                    </Card>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryAdd;
