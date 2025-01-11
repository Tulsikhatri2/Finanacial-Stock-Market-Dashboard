import React, { useEffect } from "react";
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
import {
  createCategory,
  getAllCategories,
} from "../../Redux/Categories/categoriesSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { FileUploader } from "react-drag-drop-files";
import { createProduct } from "../../Redux/Products/productSlice";

// // Use Yup Validation On Login Form
// const validationSchema = yup.object({
//   name: yup.string("Enter Product Name").required("Product name is required"),
//   name: yup
//     .string("Enter Product Description")
//     .required("Product Description is required"),
//   status: yup.string("Product Status").required("Product status is required"),
//   categoryName: yup
//     .string("Enter Category Name")
//     .required("Category Name is required"),
//   productImage: yup
//     .string("Product Image")
//     .required("Upload Peoduct Image it's required"),
// });

// File Type
const fileTypes = ["JPG", "PNG", "webp", "JPEG", "avif"];

const ProductAdd = () => {
  // Hook Call
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allCategories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.product);

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

  // File Uploade

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: false,
    categoryId: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("categoryId", formData.categoryId);
    data.append("description", formData.description);
    data.append("status", formData.status);
    if (file) {
      data.append("image", file);
    }
    dispatch(createProduct(data)).then((res)=>{
      navigate('/product-dashboard');
    });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

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
            sx={{
              width: "37%",
              color: "white",
              fontFamily: "Philosopher, sans-serif",
            }}
          >
            PRODUCT ADD
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
                / Product / Add Product
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
                      height: "90%",
                      minWidth: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      sx={{
                        width: "50%",
                        height: "90%",
                        backgroundColor: "white",
                        borderRadius: "0rem",
                      }}
                    >
                      <BackBtn Location={"/product-dashboard"} />
                      <Paper
                        sx={{
                          width: "100%",
                          height: "85%",
                          borderRadius: "0rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingInline: "5rem",
                        }}
                      >
                        <form
                          style={{
                            width: "100%",
                            height: "85%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            flexDirection: "column",
                          }}
                          action=""
                          onSubmit={handleSubmit}
                        >
                          <TextField
                            placeholder="Enter Product Name"
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
                                fontSize: "1.2rem",
                                fontFamily: "Philosopher, sans-serif",
                              },
                            }}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}

                            // name="name"
                            // value={name}
                            // onChange={handleChange}
                            // name="name"
                            // value={formik.values.name}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // error={
                            //   formik.touched.name && Boolean(formik.errors.name)
                            // }
                            // helperText={
                            //   formik.touched.name && formik.errors.name
                            // }
                          />
                          <TextField
                            placeholder="Enter Product Description"
                            fullWidth
                            required
                            multiline
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#212121",
                                },
                              },
                              "& .MuiInputBase-input": {
                                color: "#424242",
                                fontSize: "1.2rem",
                                fontFamily: "Philosopher, sans-serif",
                              },
                            }}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            // name="name"
                            // value={name}
                            // onChange={handleChange}
                            // name="description"
                            // value={formik.values.description}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // error={
                            //   formik.touched.description &&
                            //   Boolean(formik.errors.description)
                            // }
                            // helperText={
                            //   formik.touched.description &&
                            //   formik.errors.description
                            // }
                          />
                          <Box
                            sx={{
                              width: "100%",
                              height: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Select
                              fullWidth
                              required
                              sx={{
                                width: "49%",
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
                                  fontSize: "1.2rem",
                                  fontFamily: "Philosopher, sans-serif",
                                  color: "#424242",
                                },
                              }}
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              // name="status"
                              // value={status}
                              // onChange={handleChange}
                              // name="status"
                              // value={formik.values.status}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}
                              // error={
                              //   formik.touched.status &&
                              //   Boolean(formik.errors.status)
                              // }
                              // helperText={
                              //   formik.touched.status && formik.errors.status
                              // }
                            >
                              <MenuItem
                                value={true}
                                sx={{
                                  fontSize: "1.4rem",
                                  color: "#424242",
                                  fontFamily: "Philosopher, sans-serif",
                                }}
                              >
                                Active
                              </MenuItem>
                              <MenuItem
                                value={false}
                                sx={{
                                  fontSize: "1.4rem",
                                  color: "#424242",
                                  fontFamily: "Philosopher, sans-serif",
                                }}
                              >
                                Inactive
                              </MenuItem>
                            </Select>
                            <Select
                              fullWidth
                              required
                              sx={{
                                width: "49%",
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
                                  fontSize: "1.2rem",
                                  fontFamily: "Philosopher, sans-serif",
                                  color: "#424242",
                                },
                              }}
                              name="categoryId"
                              value={formData.categoryId}
                              onChange={handleInputChange}
                              // name="status"
                              // value={status}
                              // onChange={handleChange}
                              // name="categoryId"
                              // value={formik.values.categoryId}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}
                              // error={
                              //   formik.touched.categoryId &&
                              //   Boolean(formik.errors.categoryId)
                              // }
                              // helperText={
                              //   formik.touched.categoryId &&
                              //   formik.errors.categoryId
                              // }
                            >
                              {allCategories.map((categoryName) => (
                                <MenuItem
                                  value={categoryName._id}
                                  sx={{
                                    fontSize: "1.4rem",
                                    color: "#424242",
                                    fontFamily: "Philosopher, sans-serif",
                                  }}
                                >
                                  {categoryName.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                          <FileUploader
                            handleChange={handleChange}
                            name="file"
                            // type={file}
                            types={fileTypes}
                            required="true"
                            label="Upload Product Image"
                            classes="product-img"
                            onChange={handleFileChange}
                            // name="image"
                            // value={formik.values.file}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // error={
                            //   formik.touched.file && Boolean(formik.errors.file)
                            // }
                            // helperText={
                            //   formik.touched.file && formik.errors.file
                            // }
                          />
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              paddingBlock: "1.2rem",
                              fontSize: "1.2rem",
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
                            // onClick={handleCreateProduct}
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

export default ProductAdd;
