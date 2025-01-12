import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const portfolioData = [
    { name: "Apple Inc (AAPL)", holdings: 100, buyPrice: 150, currentPrice: 175 },
    { name: "Google (GOOGL)", holdings: 50, buyPrice: 2500, currentPrice: 2700 },
    { name: "Tesla (TSLA)", holdings: 30, buyPrice: 600, currentPrice: 750 },
    { name: "Amazon (AMZN)", holdings: 20, buyPrice: 3200, currentPrice: 3400 },
    { name: "Microsoft (MSFT)", holdings: 70, buyPrice: 290, currentPrice: 315 },
    { name: "Meta Platforms (META)", holdings: 40, buyPrice: 250, currentPrice: 280 },
];

const calculateProfitLoss = (buyPrice, currentPrice, holdings) => {
    return (currentPrice - buyPrice) * holdings;
};

const calculateAssets = (currentPrice, holdings) => {
    return currentPrice * holdings;
};

const Portfolio = () => {
    const [data] = useState(portfolioData);

    const totalProfitLoss = data.reduce((acc, stock) => {
        return acc + calculateProfitLoss(stock.buyPrice, stock.currentPrice, stock.holdings);
    }, 0);

    const pieChartData = {
        labels: data.map((stock) => stock.name),
        datasets: [
            {
                label: "Profit/Loss",
                data: data.map((stock) =>
                    calculateProfitLoss(stock.buyPrice, stock.currentPrice, stock.holdings)
                ),
                backgroundColor: ["#82ca9d", "#8884d8", "#ff7300", "#d45087", "#ff6347", "#2ca02c"],
                borderWidth: 1,
            },
        ],
    };

    const barChartData = {
        labels: data.map((stock) => stock.name),
        datasets: [
            {
                label: "Assets",
                data: data.map((stock) => calculateAssets(stock.currentPrice, stock.holdings)),
                backgroundColor: "#8884d8",
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ padding: "20px", backgroundColor: "black", height: "auto" }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "white", fontFamily: "Philosopher, sans-serif", textDecoration:"underline" }}>
                Investor-A Asset Portfolio Overview
            </Typography>

            <Box mt={5} display="flex" justifyContent="space-around" alignItems="center">
                <Box
                    sx={{
                        width: "45%",
                        height: "400px",
                        backgroundColor: "white",
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: "0px 0px 1.5vh gray",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: "Philosopher, sans-serif", }}>
                        Profit/Loss Distribution
                    </Typography>
                    <Pie
                        data={pieChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                            },
                            maintainAspectRatio: false,
                        }}
                    />
                </Box>

                <Box
                    sx={{

                        width: "45%",
                        height: "400px",
                        backgroundColor: "white",
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: "0px 0px 1.5vh gray",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: "Philosopher, sans-serif", }}>
                        Asset Distribution
                    </Typography>
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                            },
                            maintainAspectRatio: false,
                            scales: {
                                x: { beginAtZero: true },
                                y: { beginAtZero: true },
                            },
                        }}
                    />
                </Box>
            </Box>

            <Grid container spacing={3} sx={{marginTop:"5vh"}}>
                {data.map((stock, index) => (
                    <Grid item xs={12} sm={4} key={index} sx={{

                    }}>
                        <Card sx={{ boxShadow: "0px 0px 1.5vh gray" }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Philosopher, sans-serif" }}>{stock.name}</Typography>
                                <Typography sx={{ fontFamily: "Philosopher, sans-serif", fontSize:"1.7vh"}}>Holdings: {stock.holdings}</Typography>
                                <Typography sx={{ fontFamily: "Philosopher, sans-serif", fontSize:"1.7vh"}}>
                                    Buy Price: ₹{stock.buyPrice} | Current Price: ₹{stock.currentPrice}
                                </Typography>
                                <Typography sx={{ fontFamily: "Philosopher, sans-serif",fontSize:"1.7vh" }}>
                                    Profit/Loss: ₹
                                    {calculateProfitLoss(stock.buyPrice, stock.currentPrice, stock.holdings)}
                                </Typography>
                                <Typography sx={{ fontFamily: "Philosopher, sans-serif",fontSize:"1.7vh" }}>
                                    Assets: ₹{calculateAssets(stock.currentPrice, stock.holdings)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={4} textAlign="center">
                <Typography
                    variant="h5"
                    sx={{
                        color: "black",
                        fontWeight: "bold",
                        padding: 2,
                        backgroundColor: "white",
                        display: "inline-block",
                        borderRadius: 2,
                        boxShadow: 2,
                        fontFamily: "Philosopher, sans-serif",
                    }}
                >
                    Total Profit/Loss: ₹{totalProfitLoss}
                </Typography>
            </Box>
        </Box>
    );
};

export default Portfolio;
