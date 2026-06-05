import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getDashboardStats = async () => {
  const response = await apiClient.get(
    API_ENDPOINTS.DASHBOARD_STATS
  );

  return response.data;
};