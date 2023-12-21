import DefaultHeaderOptions from "constants/DefaultHeaderOptions";
import { Stack } from "expo-router";

export default function NumbersStackLayout() {
  return (
    <Stack screenOptions={DefaultHeaderOptions}>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "List of chaldean numbers" }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
