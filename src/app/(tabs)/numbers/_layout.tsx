import { Colors } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

const defaultOptions = {
  headerBackground: () => (
    <LinearGradient
      colors={Colors.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  ),
  headerTitleStyle: {
    color: Colors.text,
  },
  headerTintColor: Colors.text,
};

export default function NumbersStackLayout() {
  return (
    <Stack screenOptions={defaultOptions}>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "List of chaldean numbers" }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
