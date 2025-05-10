import { AlertNotification } from "../types/alert.notification";
import { getUserId } from "../utils/secure-store";
import { socket } from "./socket-instance";

export const broadcastAlertNotificationUseCase = async (
  alert: AlertNotification
) => {
  const driverId = await getUserId();
  if (!driverId) throw new Error("No User ID Found !");
  alert.driverId = driverId;

  alert.timestamp = Date.now();

  socket.emit("alertNotification", alert);
};
