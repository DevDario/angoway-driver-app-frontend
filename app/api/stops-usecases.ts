import { Stop } from "../types/stops";
import { api } from "./axios-instance";
import { getToken } from "../utils/secure-store";
import { StopResponse } from "../types/stop-response";

export const createStop = async (body: Stop) => {
  const token = getToken();
  const response = await api.post("/stops", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getStops = async (): Promise<StopResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/stops/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getStopById = async (id: number): Promise<StopResponse> => {
  const token = getToken();
  const response = await api.get(`/stops/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTravel = async (id: number, body: Stop) => {
  const token = getToken();
  const response = await api.patch(`/stops/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteStop = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/stops/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
