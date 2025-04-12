import { io } from "socket.io-client";
import { getToken } from "../utils/secure-store";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000"

const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"],
  auth: async (cb) => {
    const token = getToken();
    cb({ token });
  },
});

export { socket };
