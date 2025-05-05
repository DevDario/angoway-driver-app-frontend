import { busDetailsResponse } from "../types/bus-details-response";
import { api } from "./axios-instance";
import { getToken } from "../utils/secure-store";
import { updateBusDetails } from "../types/update-bus-details";

export const getBusDetailsUseCase = async () => {
  const token = await getToken();
  const response = await api.get("/bus/dashboard-details", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as busDetailsResponse;
};

export const updateBusDetailsUseCase = async ({status, currentLoad}: updateBusDetails) => {
  const token = await getToken();
  const busId = 1 // replace with id from the token
  const response = await api.patch(`/bus/dashboard-details/${busId}`, {
    status,
    currentLoad
  }, {
    headers: {
      Authorization:`Bearer ${token}`
    },
  });
  return response.data;
}

export const queryRoutesUseCase = async (query: string) => {
  const token = await getToken();
  const response = await api.get(`/routes/search/${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};