import { Box } from "@mui/material";
import React from "react";

const CircularLoader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className="loader"></Box>
    </Box>
  );
};

export default CircularLoader;
