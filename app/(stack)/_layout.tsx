import { Stack } from "expo-router";
import QueryProvider from "../providers/QueryProvider";



export default function AuthLayout() {
    return (
        <QueryProvider>
            <Stack
              screenOptions={{
                headerShown: false
              }}
            >
                <Stack.Screen name="auth/login" />
            </Stack>
        </QueryProvider>
    )
}