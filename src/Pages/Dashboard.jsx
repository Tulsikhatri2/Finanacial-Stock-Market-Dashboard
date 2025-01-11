import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, // Register point element
  LineElement, // Register line element
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const theme = useTheme();
  const [isClosing, setIsClosing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState("");
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsData, setNewsData] = useState([]);

  const apiKey = "DuVn_6L08EYOjtFHzOdpcINvzW6xikt7"; // Replace with your actual Polygon API key

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const symbols = ["GOOG", "AAPL", "TSLA"];
        const stockPromises = symbols.map((symbol) =>
          axios.get(
            `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${apiKey}`
          )
        );
        const responses = await Promise.all(stockPromises);

        const fetchedData = responses.map((response, index) => {
          const data = response.data.results[0];
          return {
            symbol: symbols[index],
            value: data.close,
            holdings: Math.floor(Math.random() * 100), // Random holdings for demonstration
          };
        });
        setStockData(fetchedData);

        // Calculate portfolio value
        let totalValue = fetchedData.reduce(
          (acc, stock) => acc + stock.value,
          0
        );
        setPortfolioValue(totalValue);
      } catch (error) {
        console.error("Error fetching stock data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [apiKey]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news?apiKey=${apiKey}&limit=10`
        );
        setNewsData(response.data.results);
      } catch (error) {
        console.error("Error fetching news data", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNewsData();
  }, [apiKey]);

  const generateRecommendations = () => {
    setRecommendations("Buy");
  };

  const chartData = {
    labels: stockData.map((stock) => stock.symbol),
    datasets: [
      {
        label: "Portfolio Value",
        data: stockData.map((stock) => stock.value),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#0c0a0a",
        width: "100%",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          ml: { width: "100%", height: "6rem", backgroundColor: "#0c0a0a" },
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
            Financial Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
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
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        />
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
          marginTop: "6rem",
        }}
      >
        <Box sx={{ width: "100%", paddingInline: "3rem" }}>
          <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stock</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell align="right">Holdings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockData.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell align="right">{stock.value}</TableCell>
                    <TableCell align="right">
                      {((stock.value / portfolioValue) * 100).toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">{stock.holdings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
            <Grid
              container
              justifyContent="center"
              sx={{ marginBottom: "2rem" }}
            >
              <Grid item xs={12} sm={8}>
                <Line data={chartData} />
              </Grid>
            </Grid>
          )}

          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h6" color="white" gutterBottom>
              Financial News
            </Typography>
            {loadingNews ? (
              <CircularProgress />
            ) : (
              newsData.map((news) => (
                <Box
                  key={news.id}
                  sx={{
                    marginBottom: "1rem",
                    backgroundColor: "#fff",
                    padding: "1rem",
                  }}
                >
                  <Typography variant="body1">{news.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {news.description}
                  </Typography>
                  <Button
                    href={news.url}
                    target="_blank"
                    sx={{ marginTop: "0.5rem" }}
                  >
                    Read Full Article
                  </Button>
                </Box>
              ))
            )}

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "2rem" }}
              onClick={generateRecommendations}
            >
              Generate Recommendations
            </Button>
            {recommendations && (
              <Typography variant="h6" color="white" sx={{ marginTop: "1rem" }}>
                Recommendation: {recommendations}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;