import { deleteCookie, getTokenFromCookie } from "@/lib/utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Types
export interface ErrorResponse {
  message: string;
  status: number;
}

// Define a type for expected error response data
export interface ApiErrorData {
  message: string;
  [key: string]: unknown;
}

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromCookie("authtoken");
    console.log({ token });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorData>) => {
    const { response } = error;

    if (response) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          const cookieExists = getTokenFromCookie("authtoken");
          if (window.location.pathname != "/" && !!cookieExists) {
            deleteCookie("authToken");
            window.location.href = "/";
          }
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    } else if (error.request) {
      // Handle network errors
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper methods
const handleError = (error: AxiosError<ApiErrorData>): ErrorResponse => {
  if (error.response) {
    return {
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
    };
  }
  return {
    message: error.message || "Network error",
    status: 500,
  };
};

// Export instance and helpers
export { api, handleError };

export default api;
