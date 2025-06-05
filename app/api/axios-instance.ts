import axios from "axios"

const BACKEND_URL = "http://192.168.18.16:3000";

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    },
})
