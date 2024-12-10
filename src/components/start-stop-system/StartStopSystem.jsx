import React, { useContext } from "react";
import axios from "axios";
import { FaPlay, FaStop } from "react-icons/fa";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import "./style.css";

const StartStopSystem = () => {
  const { customerCount, vendorCount } = useContext(GlobalStateContext);
  const systemApiUrl = "http://localhost:8080/ticketing-system/api/system";

  const startSystem = async () => {
    try {
      await axios.post(`${systemApiUrl}/start`, null, {
        params: {
          numberOfVendors: vendorCount,
          numberOfCustomers: customerCount,
        },
      });
      console.log("System started successfully");
    } catch (error) {
      console.error("Error starting system: ", error);
    }
  };

  const stopSystem = async () => {
    try {
      await axios.post(`${systemApiUrl}/stop`);
      console.log("System stopped successfully");
    } catch (error) {
      console.error("Error stopping the system: ", error);
    }
  };

  return (
    <div className="control-buttons">
      <button onClick={startSystem} className="start-btn">
        <FaPlay className="button-icon" />
        Start
      </button>
      <button onClick={stopSystem} className="stop-btn">
        <FaStop className="button-icon" />
        Stop
      </button>
    </div>
  );
};

export default StartStopSystem;
