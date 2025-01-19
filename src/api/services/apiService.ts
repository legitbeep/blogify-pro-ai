import { AxiosError } from "axios";
import api, { ApiErrorData, handleError } from "../axios";
import { CONSTANTS, getKeyFromLocalStorage } from "@/lib/utils";

export const apiService = {
  async get<T>(url: string) {
    try {
      const token = getKeyFromLocalStorage(CONSTANTS.AUTH_TOKEN);
      const response = await api.get<T>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ApiErrorData>);
    }
  },

  async post<T>(url: string, data: any) {
    try {
      const response = await api.post<T>(url, {
        ...(data || {}),
      });
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ApiErrorData>);
    }
  },

  async put<T>(url: string, data: unknown) {
    try {
      const response = await api.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ApiErrorData>);
    }
  },

  async delete<T>(url: string) {
    try {
      const response = await api.delete<T>(url);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ApiErrorData>);
    }
  },

  async patch<T>(url: string, data: any) {
    try {
      const response = await api.patch<T>(url, {
        ...(data || {}),
      });
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ApiErrorData>);
    }
  },
};
