import { useAuthenticationStatus, useUserData } from "@nhost/react";
import LoadingSpinner from "components/atoms/LoadingSpinner";
import DefaultHeaderOptions from "constants/DefaultHeaderOptions";
import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  const user = useUserData();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (!user && !isAuthenticated) {
    return (
      <Stack screenOptions={DefaultHeaderOptions}>
        <Stack.Screen
          name="not-authenticated"
          options={{ headerTitle: "Profile" }}
        />
        <Stack.Screen name="source" options={{ headerTitle: "Source" }} />
        <Stack.Screen
          name="privacy-policy"
          options={{ headerTitle: "Privacy Policy" }}
        />
      </Stack>
    );
  }

  return isAuthenticated && user && !isLoading ? (
    <Stack screenOptions={DefaultHeaderOptions}>
      <Stack.Screen name="index" options={{ headerTitle: "Profile" }} />
      <Stack.Screen
        name="privacy-policy"
        options={{ headerTitle: "Privacy Policy" }}
      />
      <Stack.Screen name="source" options={{ headerTitle: "Source" }} />
      <Stack.Screen
        name="change-password"
        options={{
          headerTitle: "Change your password",
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{ headerTitle: "Your favorites" }}
      />
    </Stack>
  ) : (
    <LoadingSpinner />
  );
}
