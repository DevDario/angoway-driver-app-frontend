import * as Location from "expo-location";

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.warn("Permission to access location was denied");
    return false;
  }
  
  return true
}