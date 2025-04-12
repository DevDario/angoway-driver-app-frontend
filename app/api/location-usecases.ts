import { DriverLocation } from "../types/driver-location";
import { socket } from "./socket-instance";

export const broadcastDriverLocationUseCase = (location: DriverLocation) => {
  socket.emit("driverLocation", location);
}