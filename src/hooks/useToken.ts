import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import AuthService from "@/api/services/authService";
import {
  CONSTANTS,
  getKeyFromLocalStorage,
  setKeyInLocalStorage,
} from "@/lib/utils";

export const useToken = () => {
  const { user } = useUser();
  const token = getKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
  const [backendToken, setBackendToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBackendToken = async () => {
    try {
      const response = await AuthService.getUserToken({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        name: user?.fullName ?? "",
        picture: user?.imageUrl ?? "",
      });

      if (!response.token) {
        throw new Error("Failed to fetch backend token");
      }
      if (response.token && response.token != "null")
        setKeyInLocalStorage(CONSTANTS.AUTH_TOKEN, response.token);
      return response.token;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const initializeToken = async () => {
      try {
        setIsLoading(true);

        const token = await fetchBackendToken();
        setBackendToken(token);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setBackendToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (!token && !!user) initializeToken();
  }, [token, user]);

  return {
    token: backendToken,
    isLoading,
    error,
    fetchBackendToken,
  };
};
