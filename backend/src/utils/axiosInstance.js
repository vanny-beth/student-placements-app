import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./tokenStorage";

// Create instance with base config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://verbose-parakeet-969p69vqq4g2r47.github.dev/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 401 + refresh flow
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();
        if (!refresh) {
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Get new tokens
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "https://verbose-parakeet-969p69vqq4g2r47.github.dev/api"}/token/refresh/`,
          { refresh }
        );

        setTokens(res.data.access, refresh);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
