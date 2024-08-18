import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
}
