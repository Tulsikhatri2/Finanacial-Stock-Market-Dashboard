import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CssBaseline,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../../Components/Loading/CircularLoader";
import { useNavigate, useParams } from "react-router-dom";
import { userDetails } from "../../Redux/auth/authSlice";
import BackBtn from "../../Components/Button/BackBtn";
import defaultImg from "../../assets/Img/userDefaultImage.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import { getProduct } from "../../Redux/Products/productSlice";
// import { getProduct } from "../../Redux/Products/productSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { isLoading, userInfo, product } = useSelector(
    (state) => state.product
  );
  console.log(product, "oo");

  console.log(product.image?.path, "image");

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

  useEffect(() => {
    dispatch(getProduct(_id));
  }, []);

  return (
    <>
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
              sx={{ width: "35%", color: "white" }}
            >
              USER DETAILS
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
                  }}
                >
                  <HomeIcon
                    sx={{
                      color: "white",
                      fontSize: "3.5rem",
                      marginRight: "1rem",
                    }}
                  />{" "}
                  / Product / Product Details
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "75%",
                  overflowY: "scroll",
                  display: "flex",
                  alignItems: "center",
                  jusctifyContent: "center",
                  flexDirection: "column",
                  // backgroundColor: "white",
                }}
                className="displayClass"
              >
                {isLoading ? (
                  <>
                    <CircularLoader />
                  </>
                ) : (
                  <>
                    <BackBtn Location={"/product-dashboard"} />

                    <Box
                      sx={{
                        width: "60%",
                        maxHeight: "30rem",
                        // minWidth: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor:"white",
                        marginTop: "3rem",
                        // flexDirection: "column",
                        // border: "1px solid white",
                        boxShadow: "0.1rem 0.1rem 0.5rem white",
                      }}
                    >
                      {/* <Box
                        sx={{
                          width: "45%",
                          height: "5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:"white",
                          marginTop:"8rem"
                        }}
                      > */}
                      {/* <BackBtn Location={"/product-dashboard"} /> */}
                      {/* </Box> */}
                      <Box
                        sx={{
                          width: "40%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingTop: "2rem",
                        }}
                      >
                        <img
                          //src={`https://node-js-wse4.onrender.com/uploads/1723054005146-pexels-photo-1212693.webp`}
                          // src={`https://node-js-wse4.onrender.com/uploads/1726824427259-burger.jpg`}
                          src={`https://node-js-wse4.onrender.com/uploads/${product.fileName}`}
                          alt="notFound"
                          width="90%"
                          height="90%"
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "60%",
                          height: "100%",
                          marginTop: "2rem",
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "space-between",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "10%",
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "end",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              paddingBlock: "1rem",
                              borderRadius: "0rem",
                              backgroundColor: "#0c0a0a",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#bdbdbd",
                                color: "#0c0a0a",
                              },
                            }}
                          >
                            <EditIcon fontSize="large" />
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              paddingBlock: "1rem",
                              borderRadius: "0rem",
                              backgroundColor: "#0c0a0a",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#bdbdbd",
                                color: "#0c0a0a",
                              },
                            }}
                          >
                            <DeleteIcon fontSize="large" />
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "90%",
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "space-around",
                            flexDirection: "column",
                            paddingLeft: "1rem",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{ color: "white", fontWeight: "500" }}
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="h4" sx={{ color: "#D4AF37" }}>
                            {product.category?.name}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ color: "#616161", fontWeight: "bold" }}
                          >
                            {/* {new Date(product.createdAt).toLocaleDateString(
                            "en-In"
                          )} */}

                            {new Date(product.createAt).toLocaleDateString(
                              "en-In"
                            )}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "white" }}>
                            {product.id}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ color: "#bdbdbd", textAlign: "justify" }}
                          >
                            {product.description}
                          </Typography>
                          <Box
                            sx={{
                              width: "100%",
                              height: "12%",
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "end",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                paddingBlock: "1rem",
                                borderRadius: "0rem",
                                backgroundColor: "#0c0a0a",
                                fontSize: "1.5rem",
                                boxShadow: "0rem 0rem 1rem #D4AF37",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#D4AF37",
                                  color: "white",
                                },
                              }}
                            >
                              Add TO CART
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
