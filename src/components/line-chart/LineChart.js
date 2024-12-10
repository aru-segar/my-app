import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./LineChart.css"; 

Chart.register(...registerables);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ticket Sales Over Time",
        data: [], 
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1, 
        fill: false,
      },
    ],
  });

  useEffect(() => {
    // Fetch the initial sales data
    fetch("http://localhost:8080/ticketing-system/api/chart/sales-data")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) =>
          new Date(item.timestamp).toLocaleTimeString()
        );
        const tickets = data.map((item) => item.tickets);

        setChartData((prevState) => ({
          ...prevState,
          labels,
          datasets: [{ ...prevState.datasets[0], data: tickets }],
        }));
      })
      .catch((error) => console.error("Error fetching sales data:", error));

    // WebSocket for real-time updates
    const socket = new WebSocket("http://localhost:8080/ticketing-system/ws");

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const log = message?.log; // Optional chaining in case log is undefined

        if (log && log.includes("purchased")) {
          const timestamp = new Date().toLocaleTimeString();
          const remainingTickets = message?.currentTickets; // Ensure the ticket count exists

          setChartData((prevState) => ({
            ...prevState,
            labels: [...prevState.labels, timestamp],
            datasets: [
              {
                ...prevState.datasets[0],
                data: [...prevState.datasets[0].data, remainingTickets],
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    return () => socket.close();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="chart-container">
      <h2 className="chart-title">Real-Time Ticket Sales</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
              grid: {
                color: "rgba(200, 200, 200, 0.3)",
              },
            },
            y: {
              title: {
                display: true,
                text: "Tickets Remaining",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
              grid: {
                color: "rgba(200, 200, 200, 0.3)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
