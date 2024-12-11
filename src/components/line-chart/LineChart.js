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
        borderColor: "#000000",
        borderWidth: 1.2,
        fill: false,
        pointBorderColor: "orange",
        pointBackgroundColor: "orange",
      },
    ],
  });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ticketing-system/ws");

    // Fetch initial sales data
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/ticketing-system/api/chart/sales-data"
        );
        const data = await response.json();

        // Process fetched data
        const labels = data.map((item) =>
          new Date(item.timestamp).toLocaleTimeString()
        );
        const tickets = data.map((item) => item.tickets);

        setChartData({
          labels,
          datasets: [
            {
              label: "Ticket Sales Over Time",
              data: tickets,
              borderColor: "#000000",
              borderWidth: 1.2,
              fill: false,
              pointBorderColor: "orange",
              pointBackgroundColor: "orange",
  
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching initial sales data:", error);
      }
    };

    fetchInitialData();

    // WebSocket connection
    socket.onopen = () => console.log("WebSocket connected for LineChart.");
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // Process WebSocket updates (e.g., for ticket sales)
        const timestamp = new Date().toLocaleTimeString();
        const remainingTickets = message?.currentTickets;

        if (remainingTickets !== undefined) {
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

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket connection closed.");

    // Cleanup on component unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

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
                  color: "rgba(0, 0, 0, 1)",
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
                  color: "rgba(0, 0, 0, 1)",
                },
              },
              grid: {
                color: "rgba(220, 220, 220, 0.5)",
              },
            },
            y: {
              title: {
                display: true,
                text: "Tickets Remaining",
                font: {
                  size: 12,
                  weight: "bold",
                  color: "rgba(0, 0, 0, 1)",
                },
              },
              grid: {
                color: "rgba(220, 220, 220, 0.5)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
