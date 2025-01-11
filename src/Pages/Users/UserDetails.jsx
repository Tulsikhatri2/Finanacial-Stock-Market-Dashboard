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
const UserDetails = () => {
  const { isLoading, userInfo } = useSelector((state) => state.auth);

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
  const params = useParams();

  const userId = params.userId;
  console.log(userId);

  useEffect(() => {
    dispatch(userDetails(userId));
  }, []);

  console.log(userInfo);
  const { id, name, email, createAt, updateAt, isEmailVerified } = userInfo;
  console.log(isEmailVerified);
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
                  / User / User Details
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
                          paddingBlock: "3rem",
                        }}
                      >
                        <BackBtn Location={"/user-dashboard"} />
                        <Paper
                          sx={{
                            width: "100%",
                            height: "35%",
                            borderRadius: "0rem",
                            border: "none",
                            boxShadow: "none",
                          }}
                          className="displayClass"
                        >
                          <Paper
                            sx={{
                              width: "20%",
                              height: "90%",
                              boxShadow: "none",
                              borderRadius: "50%",
                            }}
                            className="displayClass"
                          >
                            {isEmailVerified ? (
                              <>
                                <VerifiedIcon
                                  sx={{ fontSize: "7rem", color: "green" }}
                                />
                              </>
                            ) : (
                              <>
                                <CancelIcon
                                  sx={{ fontSize: "7rem", color: "maroon" }}
                                />
                              </>
                            )}
                          </Paper>
                        </Paper>
                        <Box
                          sx={{
                            width: "100%",
                            height: "55%",
                            borderRadius: "0rem",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            fontFamily: "Philosopher, sans-serif",
                          }}
                          className="displayClass"
                        >
                          <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                            <span style={{ fontWeight: "bold" }}>
                              UserName:{" "}
                            </span>
                            {name}
                          </Typography>

                          <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                            <span style={{ fontWeight: "bold" }}>
                              UserId :{" "}
                            </span>
                            {id}
                          </Typography>
                          <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                            <span style={{ fontWeight: "bold" }}>Email: </span>
                            {email}
                          </Typography>
                          <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                            <span style={{ fontWeight: "bold" }}>
                              Created At :{" "}
                            </span>
                            {createAt}
                          </Typography>
                          <Typography variant="h6" sx={{fontFamily: "Philosopher, sans-serif",}}>
                            <span style={{ fontWeight: "bold" }}>
                              Updated At :{" "}
                            </span>
                            {updateAt}
                          </Typography>
                        </Box>
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

export default UserDetails;
