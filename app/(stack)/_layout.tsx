import { Stack } from "expo-router";
import QueryProvider from "../providers/QueryProvider";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";



export default function AuthLayout() {
  const [fontsLoaded] = useFonts({
      Inter: require("../../assets/fonts/InterRegular.ttf"),
      "Inter-Bold": require("../../assets/fonts/InterBold.ttf"),
      "Inter-Light": require("../../assets/fonts/InterLight.ttf"),
      "Inter-Medium": require("../../assets/fonts/InterMedium.ttf"),
      "Inter-Regular": require("../../assets/fonts/InterRegular.ttf"),
    });
  
    useEffect(() => {
      if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }
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