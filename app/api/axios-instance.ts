import axios from "axios"

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    },
})
