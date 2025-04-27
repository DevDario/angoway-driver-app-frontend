import { io } from "socket.io-client";
import { getToken } from "../utils/secure-store";

const BACKEND_URL = "http://172.20.10.14:3000"

const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"],
  auth: async (cb) => {
    const token = await getToken();
    cb({ token });
  },
});

export { socket };
