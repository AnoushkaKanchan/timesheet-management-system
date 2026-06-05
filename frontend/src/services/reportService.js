import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Fetches JSON report entries matching selected criteria parameters
 */
export const getReportPreview = async (filters = {}) => {
  const cleanFilters = {};
  
  // Strip out empty or 'ALL' strings to minimize query parameters sent
  Object.keys(filters).forEach((key) => {
    if (filters[key] && filters[key] !== "ALL") {
      cleanFilters[key] = filters[key];
    }
  });

  const response = await apiClient.get(API_ENDPOINTS.REPORTS, {
    params: cleanFilters,
  });
  return response.data;
};

/**
 * Downloads the filtered CSV report artifact attachment file
 */
export const exportReportCSV = async (filters = {}) => {
  const cleanFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key] && filters[key] !== "ALL") {
      cleanFilters[key] = filters[key];
    }
  });

  const response = await apiClient.get(API_ENDPOINTS.REPORT_EXPORT, {
    params: cleanFilters,
    responseType: "blob", // Important for handling binary or file download arrays
  });
  
  return response.data;
};