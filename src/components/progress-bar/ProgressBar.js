import React, { useState, useEffect } from "react";
import { FaTicketAlt } from "react-icons/fa"; // Importing an icon for total tickets
import "./ProgressBar.css";

const ProgressBar = () => {
  const [currentTickets, setCurrentTickets] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(100);

  useEffect(() => {
    // Establish a WebSocket connection
    const socket = new WebSocket("http://localhost:8080/ticketing-system/ws");

    // Handle incoming messages
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCurrentTickets(data.currentTickets);
        setMaxCapacity(data.maxCapacity);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  // Calculate the progress bar percentage
  const progressPercentage = Math.min((currentTickets / maxCapacity) * 100, 100);

  return (
    <div className="progress-wrapper">
      {/* Header with icon and label */}
      <div className="header-container">
        <FaTicketAlt className="ticket-icon" />
        <h2 className="progress-header">
          Total Tickets Available ({`${currentTickets} / ${maxCapacity}`})
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
