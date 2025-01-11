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
import BackBtn from "../../Components/Button/BackBtn";
import { categoryDetails } from "../../Redux/Categories/categoriesSlice";

const CategoryDetails = () => {
  const { isLoading, categoryInfo } = useSelector((state) => state.category);

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
  //   API Fetch

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const categoryId = params._id;
  console.log(categoryId);

  useEffect(() => {
    dispatch(categoryDetails(categoryId));
  }, []);

  console.log(categoryInfo);

  const { _id, name, createAt, updateAt } = categoryInfo;

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
              sx={{ width: "40%", color: "white", fontFamily: "Philosopher, sans-serif", }}
            >
              CATEGORY DETAILS
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
                  / Categories / Category Details
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
                          height: "55%",
                          backgroundColor: "white",
                          borderRadius: "0rem",
                        }}
                      >
                        <BackBtn Location={"/category-dashboard"} />
                        <Paper
                          sx={{
                            width: "100%",
                            height: "70%",
                            paddingInline: "5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "space-around",
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                              <span style={{ fontWeight: "bold" }}>
                                Category Name :{" "}
                              </span>
                              {name}
                            </Typography>
                            <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                              <span style={{ fontWeight: "bold" }}>
                                Category Id:{" "}
                              </span>
                              {_id}
                            </Typography>
                            <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                              <span style={{ fontWeight: "bold" }}>
                                Create At :{" "}
                              </span>
                              {createAt}
                            </Typography>
                            <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                              <span style={{ fontWeight: "bold" }}>
                                Update At :{" "}
                              </span>
                              {updateAt}
                            </Typography>
                          </Box>
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
    </>
  );
};

export default CategoryDetails;
