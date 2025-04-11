import { busDetailsResponse } from "../types/bus-details-response";
import { api } from "./axios-instance";
import { getToken } from "../utils/secure-store";


export const getBusDetails = async ():Promise<busDetailsResponse> => {
    const token = getToken()
    const response = await api.get("/bus/dashboard-details",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}