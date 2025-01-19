import {
  CONSTANTS,
  deleteKeyFromLocalStorage,
  getKeyFromLocalStorage,
} from "@/lib/utils";
import { router } from "@/main";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

// Types
export interface ErrorResponse {
  message: string;
  status: number;
}

export interface ApiErrorData {
  message: string;
  [key: string]: unknown;
}

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
    // log request api
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

const handleUnauthorized = (errorMessage = "Something went wrong") => {
  const cookieExists = getKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
  const isAuthRoute = window.location.pathname.includes("/dashboard");
  if (window.location.pathname !== "/" && !!cookieExists) {
    // deleteKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
    // router.navigate({
    //   to: "/",
    //   replace: true,
    // });
    toast.error(errorMessage);
  }
};

// Response interceptor with improved error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorData>) => {
    console.error("Response interceptor caught error:", {
      code: error.code,
      message: error.message,
      response: error.response,
    });

    // Handle network errors first
    if (error.code === "ERR_NETWORK" || !error.response) {
      handleUnauthorized("Network error! Please check your connection.");
      return Promise.reject(error);
    }

    // Handle response errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error("Unauthorized! Please login again.");
          // handleUnauthorized("You have been logged out!");
          break;
        case 403:
          toast.error("Access forbidden! You don't have permission.");
          break;
        case 404:
          toast.error("Resource not found!");
          break;
        case 500:
          toast.error("Internal server error! Please try again later.");
          // handleUnauthorized("Internal server error! Please try again later.");
          break;
        default:
          toast.error(
            error.response.data?.message || "An unexpected error occurred!"
          );
          break;
      }
    }

    return Promise.reject(error);
  }
);

// Enhanced error handler for specific use cases
const handleError = (error: AxiosError<ApiErrorData>): ErrorResponse => {
  console.error("handleError called with:", error);

  // Handle network errors
  if (error.code === "ERR_NETWORK") {
    return {
      message: "Network error! Please check your connection.",
      status: 0, // Use 0 to indicate network error
    };
  }

  // Handle response errors
  if (error.response) {
    return {
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
    };
  }

  // Handle other types of errors
  return {
    message: error.message || "An unexpected error occurred",
    status: 500,
  };
};

export { api, handleError };
export default api;
