import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const loginUser = async (credentials) => {
  const response = await apiClient.post(
    API_ENDPOINTS.LOGIN,
    credentials
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get(
    API_ENDPOINTS.ME
  );

  return response.data;
};

export const registerUser = async (registrationPayload) => {
  // Payload input signature: { first_name, last_name, username, password, password_confirm }
  const response = await apiClient.post(API_ENDPOINTS.REGISTER, registrationPayload);
  return response.data;
};