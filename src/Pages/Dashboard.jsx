import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
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
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Padding } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [cardData, setCardData] = useState(null);

  const apiKey = "AnWN7OFnpnZzhT8ZaDf2R0UnG2Zt3VPZ"; 
  const symbols = ["AAPL", "TSLA", "GOOG"]; 

  const fallbackData = [
    {
      name: "Apple",
      symbol: "AAPL",
      price: 145.6,
      changesPercentage: 1.5,
      volume: 1020000,
    },
    {
      name: "Tesla",
      symbol: "TSLA",
      price: 729.75,
      changesPercentage: -2.3,
      volume: 880000,
    },
    {
      name: "Google",
      symbol: "GOOG",
      price: 2785.6,
      changesPercentage: 0.5,
      volume: 1200000,
    },
  ];

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const stockPromises = symbols.map((symbol) =>
          axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
          )
        );
        const responses = await Promise.all(stockPromises);

        const failedResponse = responses.find(
          (response) => response.status !== 200
        );
        if (failedResponse) {
          throw new Error("API request failed");
        }

        const fetchedData = responses.map((response) => response.data[0]);

        const cardData = fetchedData.map((stock) => ({
          name: stock.name || stock.symbol,
          symbol: stock.symbol,
          profit: `${stock.changesPercentage.toFixed(2)}%`,
          portfolio: `$${stock.price.toFixed(2)}`,
        }));

        const chartInfo = {
          labels: symbols,
          datasets: [
            {
              label: "Stock Prices",
              data: fetchedData.map((stock) => stock.price),
              borderColor: "#42a5f5",
              backgroundColor: "rgba(66, 165, 245, 0.2)",
              fill: true,
            },
          ],
        };

        setCardData(cardData);
        setChartData(chartInfo);
        setStockData(fetchedData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockData(fallbackData);
        setCardData(
          fallbackData.map((stock) => ({
            name: stock.name,
            symbol: stock.symbol,
            profit: `${stock.changesPercentage}%`,
            portfolio: `$${stock.price}`,
          }))
        );
        const fallbackChartData = {
          labels: symbols,
          datasets: [
            {
              label: "Stock Prices",
              data: fallbackData.map((stock) => stock.price),
              borderColor: "#42a5f5",
              backgroundColor: "rgba(66, 165, 245, 0.2)",
              fill: true,
            },
          ],
        };
        setChartData(fallbackChartData);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [apiKey]);

  return (
    <Box sx={{ p: 2, height: "100vh", overflow: "auto", backgroundColor: "black" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "white",
          fontFamily: "Philosopher, sans-serif",
          textDecoration: "underline",
        }}
      >
        Financial Dashboard
      </Typography>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
            <div style={{width:"75vw",display:"flex", alignItems:"center", justifyContent:"space-between",marginLeft:"2vw"}}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "white",
                fontFamily: "Philosopher, sans-serif",
             }}
          >
            Stock Summary
            
          </Typography>
            <button style={{paddingInline:"2vh", paddingBlock:"1vh",backgroundColor:"#ff9800", color:"white", borderRadius:"2vh" }}>
                Update Recommendations
            </button>

            </div>
          <Grid container spacing={2} mt={1}>
            {cardData &&
              cardData.slice(0, 3).map((card, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      borderLeft: `4px solid ${
                        index % 2 === 0 ? "#42a5f5" : "#ff9800"
                      }`,
                      boxShadow: 3,
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "1.5rem", fontWeight: "bold",  fontFamily: "Philosopher, sans-serif", }}
                      >
                        {card.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: "1.5rem", fontWeight: "bold",  fontFamily: "Philosopher, sans-serif", }}
                      >
                        Portfolio: {card.portfolio}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: card.profit.startsWith("-") ? "red" : "green",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          fontFamily: "Philosopher, sans-serif",
                        }}
                      >
                        {card.profit}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "2rem",
              color: "white",
              fontFamily: "Philosopher, sans-serif",
            }}
          >
            Stock Prices Overview
          </Typography>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : chartData ? (
              <Line data={chartData} />
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ fontFamily: "Philosopher, sans-serif",}}>
                No stock data available
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "2rem",
              color: "white",
              fontFamily: "Philosopher, sans-serif",
            }}
          >
            Stock Details
          </Typography>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : stockData.length === 0 ? (
              <Typography variant="body1" color="textSecondary" sx={{ fontFamily: "Philosopher, sans-serif",}}>
                No stock data available
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontFamily: "Philosopher, sans-serif", fontSize:"2vh", fontWeight:"bold"}}>Name</TableCell>
                      <TableCell align="center" sx={{ fontFamily: "Philosopher, sans-serif", fontSize:"2vh", fontWeight:"bold"}}>Price</TableCell>
                      <TableCell align="right" sx={{ fontFamily: "Philosopher, sans-serif", fontSize:"2vh", fontWeight:"bold"}}>Change %</TableCell>
                      <TableCell align="right" sx={{ fontFamily: "Philosopher, sans-serif", fontSize:"2vh", fontWeight:"bold"}}>Volume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockData.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell sx={{ fontFamily: "Philosopher, sans-serif",}}>{stock.name || stock.symbol}</TableCell>
                        <TableCell align="right" sx={{ fontFamily: "Philosopher, sans-serif",textAlign:"center"}}>
                          ${stock.price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: stock.changesPercentage < 0 ? "red" : "green",
                            fontFamily: "Philosopher, sans-serif"
                          }}
                        >
                          {stock.changesPercentage.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right"
                        sx={{ fontFamily: "Philosopher, sans-serif",}}>{stock.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
