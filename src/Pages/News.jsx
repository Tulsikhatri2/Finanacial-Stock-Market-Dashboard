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
    Typography,
    CardMedia,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { useTheme } from "@emotion/react";
  import axios from "axios";
  
  const News = () => {
    const [isClosing, setIsClosing] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const apiKey = "DuVn_6L08EYOjtFHzOdpcINvzW6xikt7"; 
  
    useEffect(() => {
      const fetchNewsData = async () => {
        try {
          const response = await axios.get(
            `https://api.polygon.io/v2/reference/news?apiKey=${apiKey}&limit=50`
          );
          setNewsData(response.data.results); 
        } catch (error) {
          console.error("Error fetching news data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchNewsData();
    }, [apiKey]);
  
  
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
          height: newsData.length === 0 ? "100vh" : "auto", 
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#0c0a0a",
          }}
        >
            <Typography
              variant="h4"
              align="right"
              sx={{
                width: "100%",
                color: "white",
                marginTop:"3vh",
                marginLeft:"10vw",
                textAlign:"center",
                fontFamily: "Philosopher, sans-serif",
                textDecoration:"underline"
              }}
            >
              Financial News
            </Typography>
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
            height: newsData.length === 0 ? "100vh" : "auto", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "6rem", 
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                  gap: 2,
                  marginTop: "2rem", 
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
                    <CardMedia
                      component="img"
                      alt="News Image"
                      height="140"
                      image={
                        news.image_url || "https://via.placeholder.com/345x140"
                      } 
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