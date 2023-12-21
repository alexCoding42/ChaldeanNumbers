import { StyleSheet } from "react-native";

import { Text } from "components/Themed";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";

export default function DateScreen() {
  return (
    <LinearGradientBackground>
      <Text style={styles.title}>Date</Text>
    </LinearGradientBackground>
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
