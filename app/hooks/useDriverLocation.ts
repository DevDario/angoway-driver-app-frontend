import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import { broadcastDriverLocationUseCase } from "../api/location-usecases";
import { socket } from "../api/socket-instance";
import { DriverLocation } from "../types/driver-location";
import { saveLastKnowBusLocation } from "../utils/secure-store";

export async function useDriverLocation(shouldTrack: boolean = true) {
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );

  useEffect(() => {
    if (!shouldTrack) return;

    socket.connect();

    const startWatching = async () => {
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000, // every 5 seconds
          distanceInterval: 10, // or every 10 meters
        },
        (loc) => {
          const driverLocation:DriverLocation = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };
          saveLastKnowBusLocation(driverLocation);
          broadcastDriverLocationUseCase(driverLocation);
        }
      );
    };

    startWatching();

    return () => {
      locationSubscription.current?.remove();
      socket.disconnect();
    };
  }, [shouldTrack]);
}
