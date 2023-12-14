import Colors from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

const defaultOptions = {
  headerBackground: () => (
    <LinearGradient
      colors={Colors.light.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  ),
  headerTitleStyle: {
    color: Colors.light.text,
  },
  headerTintColor: Colors.light.text,
};

export default function ProfileStackLayout() {
  return (
    <Stack screenOptions={defaultOptions}>
      <Stack.Screen name="index" options={{ headerTitle: "Profile" }} />
      <Stack.Screen
        name="privacy-policy"
        options={{ headerTitle: "Privacy Policy" }}
      />
      <Stack.Screen name="source" options={{ headerTitle: "Source" }} />
      <Stack.Screen
        name="favorites"
        options={{ headerTitle: "Your favorites" }}
      />
    </Stack>
  );
}
