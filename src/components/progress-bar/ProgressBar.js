import React, { useState, useEffect } from "react";
import { FaTicketAlt } from "react-icons/fa"; // Importing an icon for total tickets
import "./ProgressBar.css";

const ProgressBar = () => {
  const [currentTickets, setCurrentTickets] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(100);

  useEffect(() => {
    // Establish a WebSocket connection
    const socket = new WebSocket("ws://localhost:8080/ticketing-system/ws");

    socket.onopen = () => {
      console.log("WebSocket connected for ProgressBar updates.");
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Update state only if data is valid
        if (data && typeof data.currentTickets === "number" && typeof data.maxCapacity === "number") {
          setCurrentTickets(data.currentTickets);
          setMaxCapacity(data.maxCapacity);
        } else {
          console.error("Invalid data received from WebSocket:", data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    // Cleanup on component unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  // Calculate the progress bar percentage, ensuring it does not exceed 100%
  const progressPercentage = Math.min((currentTickets / maxCapacity) * 100, 100);

  return (
    <div className="progress-wrapper">
      {/* Header with icon and label */}
      <div className="header-container">
        <FaTicketAlt className="ticket-icon" />
        <h2 className="progress-header">
          Total Tickets Available ({`${currentTickets || 0} / ${maxCapacity || 0}`})
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: progressPercentage > 70 ? "green" : "orange",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
