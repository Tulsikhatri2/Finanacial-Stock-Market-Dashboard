import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import CountdownRedirect from "../../CountDown/CountDown";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box className="home-page">
        <Box className="home">
          <Card
            sx={{
              backgroundColor: "transparent",
              width: "80%",
              height: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              boxShadow: "none",
            }}
          >
            <Typography variant="h2" sx={{ color: "white" }}>
              Welcome to <span style={{ color: "#D4AF37" }}>Flavor</span>Fusion
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "column",
              }}
            >
              <div class="custom-loader"></div>
            </Box>
          </Card>
        </Box>
      </Box>
      <CountdownRedirect seconds={5} targetUrl="/login" />
    </>
  );
};

export default HomePage;
