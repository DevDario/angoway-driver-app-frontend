import axios from "axios"

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL || "https://angoway-app-backend.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
})