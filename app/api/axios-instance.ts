import axios from "axios"

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
})