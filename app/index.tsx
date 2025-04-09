import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import QueryProvider from "./providers/QueryProvider";
import { useAuth } from "@/app/hooks/useAuth";
import { ActivityIndicator, View } from "react-native";
import { saveToken } from "./utils/secure-store";

export default function Index() {
  const router = useRouter();
  const { authToken, isCheckingAuth } = useAuth()

  useEffect(() => {
    if (!isCheckingAuth) {
      if (authToken) {
        router.replace("/dashboard");
      } else {
        router.replace("/auth/login");
      }
    }
  }, [authToken, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return <QueryProvider />
}