import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Create an instance of axios with default configuration
export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Base URL for API requests
  withCredentials: true, // Include cookies in requests if needed
});
