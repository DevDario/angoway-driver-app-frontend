import { busDetailsResponse } from "../types/bus-details-response";
import { api } from "./axios-instance";


export const getBusDetails = async ():Promise<busDetailsResponse> => {
    const response = await api.get("/bus/dashboard-details")
    return response.data
}