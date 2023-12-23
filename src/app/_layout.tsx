import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NhostClient, NhostProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import Storage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import Constants from "expo-constants";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import DefaultHeaderOptions from "constants/DefaultHeaderOptions";

const NHOST_SUBDOMAIN = Constants?.expoConfig?.extra?.nhostSubdomain;
const NHOST_REGION = Constants?.expoConfig?.extra?.nhostRegion;

const nhost = new NhostClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
  clientStorageType: "react-native",
  clientStorage: Storage,
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <ThemeProvider value={DefaultTheme}>
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="error" options={{ headerShown: false }} />
            <Stack.Screen
              name="login"
              options={{
                ...DefaultHeaderOptions,
                headerTitle: "Login to your account",
              }}
            />
            <Stack.Screen
              name="register"
              options={{
                ...DefaultHeaderOptions,
                headerTitle: "Create a new account",
              }}
            />
            <Stack.Screen
              name="reset-password"
              options={{
                ...DefaultHeaderOptions,
                headerTitle: "Reset your password",
              }}
            />
          </Stack>
        </ThemeProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
}
