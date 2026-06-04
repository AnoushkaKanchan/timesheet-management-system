import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// --- Master Timesheet Methods ---
export const getTimesheets = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TIMESHEETS);
  return response.data;
};

export const getTimesheetById = async (id) => {
  const response = await apiClient.get(`${API_ENDPOINTS.TIMESHEETS}${id}/`);
  return response.data;
};

export const createTimesheet = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.TIMESHEETS, data);
  return response.data;
};

export const updateTimesheet = async (id, data) => {
  const response = await apiClient.put(`${API_ENDPOINTS.TIMESHEETS}${id}/`, data);
  return response.data;
};

export const deleteTimesheet = async (id) => {
  await apiClient.delete(`${API_ENDPOINTS.TIMESHEETS}${id}/`);
};

export const submitTimesheet = async (id) => {
  const response = await apiClient.post(`${API_ENDPOINTS.TIMESHEETS}${id}/submit/`);
  return response.data;
};

// --- Detailed Task Allocation Lines Methods ---
export const getTimesheetDetails = async (timesheetId) => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.TIMESHEET_DETAILS}?timesheet_master=${timesheetId}`
  );
  return response.data;
};

export const createTimesheetDetail = async (data) => {
  // Uses timesheet_master exactly as required by backend serializer constraints
  const response = await apiClient.post(API_ENDPOINTS.TIMESHEET_DETAILS, data);
  return response.data;
};

export const updateTimesheetDetail = async (id, data) => {
  const response = await apiClient.put(`${API_ENDPOINTS.TIMESHEET_DETAILS}${id}/`, data);
  return response.data;
};

export const deleteTimesheetDetail = async (id) => {
  await apiClient.delete(`${API_ENDPOINTS.TIMESHEET_DETAILS}${id}/`);
};