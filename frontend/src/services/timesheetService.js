import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getTimesheets = async () => {
  const response = await apiClient.get(
    API_ENDPOINTS.TIMESHEETS
  );

  return response.data;
};

export const getTimesheetById = async (id) => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.TIMESHEETS}${id}/`
  );

  return response.data;
};

export const getTimesheetDetails = async (timesheetId) => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.TIMESHEET_DETAILS}?timesheet_master=${timesheetId}`
  );

  return response.data;
};