import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250, height: "100%" }}
      className="drawer"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box>
        <p
          variant="h4"
          sx={{
            width: "100%",
            height: "10vh",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            marginLeft: "3rem",
            fontFamily: "Philosopher, sans-serif",
          }}
        >
          <span style={{ color: "#D4AF37" }}>Flavor</span>Fusion
        </p>
      </Box>
      <List>
        <ListItem to="/register">
          <ListItemText primary="Register" />
        </ListItem>
        <ListItem to="/login">
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "10vh" }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ fontSize: "2rem", color: "white" }} />
            </IconButton>
          )}
          <p
            component="div"
            onClick={() => navigate("/")}
            style={{ flexGrow: 1, fontWeight: "900", cursor: "pointer", fontFamily: "Philosopher, sans-serif", fontSize:"3rem" }}
          >
            <span style={{ color: "#D4AF37" }}>Stock</span>Dashboard
          </p>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              width: "auto",
              alignItems: "center",
              justifyContent: "space-around",
              fontFamily: "Philosopher, sans-serif",
            }}
          ></Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
