import axios from "axios"

const BACKEND_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    },
})
