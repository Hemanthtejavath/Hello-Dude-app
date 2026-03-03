import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production" ? "https://localhost.5001/api" : "/api"; // Base URL for API requests

// Create an instance of axios with default configuration
export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Base URL for API requests
  withCredentials: true, // Include cookies in requests if needed
});
