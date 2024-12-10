import React, { useEffect, useState } from "react";
import {
  getConfiguration,
  saveConfiguration,
} from "../service/configurationService.js";
import "./ConfigurationForm.css";

const ConfigurationForm = () => {
  const [config, setConfig] = useState({
    totalTickets: 0,
    maxTicketCapacity: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch configuration when the component mounts
  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        const loadedConfig = await getConfiguration();
        setConfig(loadedConfig);
      } catch (error) {
        console.error("Error loading configuration:", error.message);
        alert("Failed to load configuration");
      }
    };

    loadConfiguration();
  }, []);

  // Validate input fields
  const validateFields = () => {
    const errors = {};

    if (!config.totalTickets || config.totalTickets <= 0) {
      errors.totalTickets = "Total tickets must be a positive number.";
    }

    if (!config.maxTicketCapacity || config.maxTicketCapacity <= 0) {
      errors.maxTicketCapacity =
        "Maximum ticket capacity must be a positive number.";
    }

    if (config.maxTicketCapacity < config.totalTickets) {
      errors.maxTicketCapacity =
        "Maximum ticket capacity must be greater than or equal to total tickets.";
    }

    if (!config.ticketReleaseRate || config.ticketReleaseRate <= 0) {
      errors.ticketReleaseRate =
        "Ticket release rate must be a positive number.";
    }

    if (!config.customerRetrievalRate || config.customerRetrievalRate <= 0) {
      errors.customerRetrievalRate =
        "Customer retrieval rate must be a positive number.";
    }

    return errors;
  };

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));

    // Clear specific field error on change
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const form = e.target;
    if (form.checkValidity()) {
      try {
        await saveConfiguration(config); // Save the updated config
        alert("Configuration saved successfully!");
      } catch (error) {
        console.error("Error saving configuration:", error.message);
        alert("Failed to save configuration.");
      }
    } else {
      alert("Please ensure all fields are correctly filled in.");
    }
  };

  return (
    <div className="form-container">
      <h2>System Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Total Tickets
            <input
              type="number"
              name="totalTickets"
              value={config.totalTickets}
              onChange={handleChange}
              required
              min="1"
              title="Total tickets must be a positive number."
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Maximum Ticket Capacity
            <input
              type="number"
              name="maxTicketCapacity"
              value={config.maxTicketCapacity}
              onChange={handleChange}
              required
              min={config.totalTickets || 1}
              title="Maximum ticket capacity must be at least equal to total tickets."
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Ticket Release Rate
            <input
              type="number"
              name="ticketReleaseRate"
              value={config.ticketReleaseRate}
              onChange={handleChange}
              required
              min="1"
              title="Ticket release rate must be a positive number."
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Customer Retrieval Rate
            <input
              type="number"
              name="customerRetrievalRate"
              value={config.customerRetrievalRate}
              onChange={handleChange}
              required
              min="1"
              title="Customer retrieval rate must be a positive number."
            />
          </label>
        </div>
        <button type="submit">Save Configuration</button>
      </form>
    </div>
  );
};

export default ConfigurationForm;