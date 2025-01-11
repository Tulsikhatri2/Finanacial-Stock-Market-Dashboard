import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const Appbar = ({heading}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
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
          {/* USER UPDATE */}
          {heading}
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
  );
};

export default Appbar;
