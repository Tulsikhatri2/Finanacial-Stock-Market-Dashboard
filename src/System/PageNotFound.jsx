import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box className="page-not-found displayClass">
        <Box className="page-not-found-div displayClass">
          <Box className="page-not-found-icon "></Box>
          <Box className="page-not-found-text displayClass">
            <Typography variant="h3" color={"#D4AF37"} my={'1rem'}>404 - PAGE NOT FOUND</Typography>
            <Typography variant="h5" color={"white"} my={'1rem'} align="center">The page you are looking for might have been removed had its name changed or is temporarly unavailable</Typography>
            <Button variant="contained" color="info" sx={{borderRadius:"10rem", width:"30%", height:"30%", fontSize:"1.4rem"}} onClick={() => navigate('/')}>
              GO TO HOMEPAGE
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PageNotFound;
