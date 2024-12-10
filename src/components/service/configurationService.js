import axios from "axios";

// Base URL for the backend API
const API_BASE_URL = "http://localhost:8080/ticketing-system/api/configuration";

// Fetch the current configuration 
export const getConfiguration = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data; // Return the configuration object
    } catch (error) {
        throw new Error(error.response?.data || "Failed to load configuration.");
    }
};

// Save the configuration to the backend 
export const saveConfiguration = async (config) => {
    try {
        await axios.post(API_BASE_URL, config);
    } catch (error) {
        throw new Error(error.response?.data || "Failed to save configuration.");
    }
};