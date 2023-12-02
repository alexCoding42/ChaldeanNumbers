import { StyleSheet, useColorScheme } from "react-native";

import { Text } from "../../components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";

export default function NumberListScreen() {
  const colorScheme = useColorScheme();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={Colors[colorScheme ?? "light"].background}
      style={styles.container}
    >
      <Text style={styles.title}>List</Text>
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
