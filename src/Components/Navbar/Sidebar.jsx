import {
  Box,
  Button,
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  Typography,
  List,
} from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import userDefaultImage from "../../assets/Img/userDefaultImage.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const drawerWidth = "30rem";

const Sidebar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const logout = () => {
    auth.signOut();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0c0a0a",
        padding: 2,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={"bold"}
        color={"white"}
        textAlign={"center"}
        sx={{ marginTop: "3rem" }}
      >
        <span style={{ color: "#D4AF37" }}>Stock</span>Dashboard
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ flex: 1 }}>
        <List
          sx={{
            width: "100%",
            height: "10rem",
            paddingLeft: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Philosopher, sans-serif",
          }}
        >
          <Box
            sx={{
              width: "25%",
              height: "65.5%",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={userDefaultImage}
              alt="noImg"
              width={"85%"}
              height={"100%"}
              style={{ borderRadius: "50%" }}
            />
          </Box>
          <Box
            sx={{
              width: "71%",
              height: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontFamily: "Philosopher, sans-serif",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#B1BDC7",
                fontFamily: "Philosopher, sans-serif",
              }}
            >
              {user?.name && user?.name}

              <p variant="h6" sx={{ color: "#B1BDC7" }}>
                <span style={{ fontWeight: "550" }}></span> {user?.email}
              </p>
            </Typography>
          </Box>
        </List>
        <List>
          <ListItem onClick={() => navigate("/dashboard")}>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.3rem",
                    fontFamily: "Philosopher, sans-serif",
                  }}
                >
                  Dashboard
                </Typography>
              }
              sx={{ color: "white", fontSize: "3rem" }}
            />
            <Button sx={{ color: "white" }}>
              <KeyboardArrowRightIcon fontSize="large" />
            </Button>
          </ListItem>

          <ListItem onClick={() => navigate("/portfolio")}>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.3rem",
                    fontFamily: "Philosopher, sans-serif",
                  }}
                >
                  Portfolio
                </Typography>
              }
              sx={{ color: "white", fontSize: "5rem" }}
            />
            <Button sx={{ color: "white" }}>
              <KeyboardArrowRightIcon fontSize="large" />
            </Button>
          </ListItem>

          <ListItem onClick={() => navigate("/news")}>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.3rem",
                    fontFamily: "Philosopher, sans-serif",
                  }}
                >
                  News
                </Typography>
              }
              sx={{ color: "white", fontSize: "5rem" }}
            />
            <Button sx={{ color: "white" }}>
              <KeyboardArrowRightIcon fontSize="large" />
            </Button>
          </ListItem>
        </List>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            py: "1.1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "black",
            backgroundColor: "#D4AF37",
            fontFamily: "Philosopher, sans-serif",
            "&:hover": {
              backgroundColor: "#b0bec5",
              color: "#0c0a0a",
            },
          }}
          onClick={logout}
        >
          LogOut
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflow: "hidden",
            height: "auto",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
