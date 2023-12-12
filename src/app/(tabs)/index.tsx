import { StyleSheet, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "components/Themed";
import Colors from "constants/Colors";

export default function DateScreen() {
  const colorScheme = useColorScheme();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={Colors[colorScheme ?? "light"].background}
      style={styles.container}
    >
      <Text style={styles.title}>Date</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
