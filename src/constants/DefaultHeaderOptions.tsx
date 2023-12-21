import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "./Colors";

export default {
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
