import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 60000,
  withCredentials: true, // Enable sending cookies cross-origin
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure headers exist
    config.headers = config.headers || {};
    // Add CORS headers to every request
    config.headers["Access-Control-Allow-Credentials"] = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
