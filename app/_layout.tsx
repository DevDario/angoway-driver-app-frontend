import { Stack } from "expo-router";
import QueryProvider from "./providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="index" options={{
          title: "index"
        }} />

      </Stack>

    </QueryProvider>
  )
}
