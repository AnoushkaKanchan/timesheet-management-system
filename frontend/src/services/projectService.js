import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getProjects = async () => {
  const response = await apiClient.get(
    API_ENDPOINTS.PROJECTS
  );

  return response.data;
};