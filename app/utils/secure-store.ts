import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY: string = process.env.EXPO_PUBLIC_TOKEN_KEY || "access_token";

export async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

export async function removeToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
}

export function decodeToken(
  token: string
): { sub: number; [key: string]: any } | null {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export async function getUserId(): Promise<number | null> {
  const token = await getToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.sub || null;
}
