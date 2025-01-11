import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    CardMedia,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import MenuIcon from "@mui/icons-material/Menu";
  import { useTheme } from "@emotion/react";
  import axios from "axios";
  
  const News = () => {
    const theme = useTheme();
    const [isClosing, setIsClosing] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const apiKey = "DuVn_6L08EYOjtFHzOdpcINvzW6xikt7"; // Replace with your actual Polygon API key
  
    // Fetching news data from Polygon API
    useEffect(() => {
      const fetchNewsData = async () => {
        try {
          const response = await axios.get(
            `https://api.polygon.io/v2/reference/news?apiKey=${apiKey}&limit=50`
          );
          setNewsData(response.data.results); // Get the first 50 news articles
        } catch (error) {
          console.error("Error fetching news data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchNewsData();
    }, [apiKey]);
  
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
  
    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#0c0a0a",
          width: "100%",
          height: newsData.length === 0 ? "100vh" : "auto", // Conditional height based on newsData
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            ml: {
              width: "100%",
              height: "6rem",
              backgroundColor: "#0c0a0a",
            },
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              align="right"
              sx={{
                width: "39.5%",
                color: "white",
                fontFamily: "Philosopher, sans-serif",
              }}
            >
              Financial News
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
  
        {/* Drawer Section */}
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
  
        {/* Main Content Section */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            height: newsData.length === 0 ? "100vh" : "auto", // Adjust height based on newsData
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "6rem", // Adjusts for the fixed AppBar height
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingInline: "3rem",
            }}
          >
            {/* Check loading state */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // 4 cards per row for larger screens
                  gap: 2,
                  marginTop: "2rem", // Add top margin to avoid overlap with navbar
                }}
              >
                {newsData.map((news, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: "#ffffff",
                      boxShadow: 3,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "1rem",
                    }}
                  >
                    {/* Card Content */}
                    <CardMedia
                      component="img"
                      alt="News Image"
                      height="140"
                      image={
                        news.image_url || "https://via.placeholder.com/345x140"
                      } // Fallback image URL
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {news.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {news.description || "No description available."}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href={news.url}
                        target="_blank"
                      >
                        Read Full Article
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default News;