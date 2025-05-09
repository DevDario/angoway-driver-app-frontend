import { io } from "socket.io-client";
import { getToken } from "../utils/secure-store";

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"],
  auth: async (cb) => {
    const token = await getToken();
    cb({ token });
  },
});

export { socket };
