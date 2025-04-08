import { MMKV } from "react-native-mmkv"

const TOKEN_KEY: string = process.env.EXPO_PUBLIC_TOKEN_KEY || "access_token"

export const storage = new MMKV({
    id: "secureStore",
    //encryptionKey: process.env.EXPO_PUBLIC_MMKV_ENCRYPTION_KEY
})

export function saveToken(token: string) {
    storage.set(TOKEN_KEY, token);
}

export function getToken(): string | undefined | null {
    return storage.getString(TOKEN_KEY)
}

export function removeToken() {
    storage.delete(TOKEN_KEY);
}