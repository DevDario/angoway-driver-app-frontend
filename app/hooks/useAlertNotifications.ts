import { broadcastAlertNotificationUseCase } from "../api/alerts-usecases";
import { AlertNotification } from "../types/alert.notification";
import { getLastKnowLocation } from "../utils/secure-store";

type alert = "Acidente" | "Manutenção" | "Avaria Total";

export async function useAlertNotifications({
  type,
  message,
}: {
  type: alert;
  message: string;
    }) {
    
  const currentLocation = await getLastKnowLocation();

  if (!currentLocation) throw new Error("Location not provided !");

  const notificationBody: AlertNotification = {
    type: type,
    message: message,
    loc: currentLocation,
  };

  broadcastAlertNotificationUseCase(notificationBody);
}
