import { AxiosError } from "axios";
import api, { ApiErrorData, handleError } from "../axios";

export const apiService = {
  async get<T>(url: string) {
    try {
      const response = await api.get<T>(url);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ApiErrorData>);
    }
  },

  async post<T>(url: string, data: unknown) {
    try {
      const response = await api.post<T>(url, data);
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
};
