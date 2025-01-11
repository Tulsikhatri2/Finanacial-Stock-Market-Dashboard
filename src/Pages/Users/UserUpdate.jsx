import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CssBaseline,
  Drawer,
  IconButton,
  Paper,
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
import { updateUser } from "../../Redux/auth/authSlice";

const UserUpdate = () => {
  // State Get From Slice
  const { isLoading, edit, message, updateStatus} = useSelector((state) => state.auth);
console.log(message, "data save")
  // Hook Call
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  //  State
  const [userUpdatedData, setUserUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userUpdatedData;

  const handleChange = (e) => {
    setUserUpdatedData({
      ...userUpdatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    if (edit.isEdit) {
      dispatch(
        updateUser({
          id: edit.user.id,
          name: name,
          email: email,
          password: "123456",
        })
      );
    }
    setUserUpdatedData({
      name: "",
      email: "",
      password: "",
    });
  };
  console.log(updateStatus, "update")
  useEffect(() => {
    if(updateStatus =="200"){
      navigate('/user-dashboard')
    }
  },[])

  useEffect(() => {
    setUserUpdatedData({
      name: edit.user.name,
      email: edit.user.email,
    });
  }, [edit]);

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
            sx={{ width: "35%", color: "white", fontFamily: "Philosopher, sans-serif", }}
          >
            USER UPDATE
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
                / User / Update User
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
                        height: "80%",
                        backgroundColor: "white",
                        borderRadius: "0rem",
                      }}
                    >
                      <BackBtn Location={"/user-dashboard"} />
                      <Paper
                        sx={{
                          width: "100%",
                          height: "80%",
                          borderRadius: "0rem",
                          paddingBlock: "3rem",
                          paddingInline: "5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          flexDirection: "column",
                        }}
                      >
                        <TextField
                          placeholder="Name"
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
                          name="name"
                          value={name}
                          onChange={handleChange}
                        />
                        <TextField
                          placeholder="Email"
                          fullWidth
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#212121",
                              },
                            },
                            "& .MuiInputBase-input": {
                              fontFamily: "Philosopher, sans-serif",
                              color: "#424242",
                              fontSize: "1.4rem",
                            },
                          }}
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />

                        <TextField
                          placeholder="Password"
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
                              fontFamily: "Philosopher, sans-serif",
                              fontSize: "1.4rem",
                            },
                          }}
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            paddingBlock: "1rem",
                            fontFamily: "Philosopher, sans-serif",
                            fontSize: "1.3rem",
                            backgroundColor: "#D4AF37",
                            color: "black",
                            fontWeight: "bold",
                            "&:hover": {
                              backgroundColor: "#0c0a0a",
                              color: "white",
                            },
                          }}
                          type="submit"
                          onClick={handleUserUpdate}
                        >
                          Update
                        </Button>
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

export default UserUpdate;
