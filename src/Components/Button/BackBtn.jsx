import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const BackBtn = ({ Location }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "15%",
        minWidth: 700,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0c0a0a",
        justifyContent: "start",
      }}
    >
      <Link to={Location}>
        <Button
          variant="contained"
          sx={{
            borderRadius: "0rem",
            marginLeft: "1rem",
            fontSize: "1.5rem",
            color: "black",
            backgroundColor: "#D4AF37",
            fontFamily: "Philosopher, sans-serif",
            "&:hover": {
              backgroundColor: "#b0bec5",
              color: "#0c0a0a",
            },
          }}
        >
          <ArrowBackIcon fontSize="large" sx={{}} />
        </Button>
      </Link>
    </Box>
  );
};

export default BackBtn;
