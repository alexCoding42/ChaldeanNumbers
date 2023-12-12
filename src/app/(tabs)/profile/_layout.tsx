import Colors from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

const defaultOptions = {
  title: "Privacy Policy",
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
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-policy" options={defaultOptions} />
    </Stack>
  );
}
