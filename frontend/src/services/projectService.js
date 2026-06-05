import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getProjects = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PROJECTS);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await apiClient.post(
    API_ENDPOINTS.PROJECTS,
    projectData
  );
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await apiClient.put(
    `${API_ENDPOINTS.PROJECTS}${id}/`,
    projectData
  );
  return response.data;
};

export const deleteProject = async (id) => {
  await apiClient.delete(
    `${API_ENDPOINTS.PROJECTS}${id}/`
  );
};