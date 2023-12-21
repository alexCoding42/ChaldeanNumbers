import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Colors } from "constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function ErrorScreen() {
  const { errorTitle, errorMessage } = useLocalSearchParams();
  return (
    <LinearGradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>{errorTitle}</Text>
        <Text style={styles.message}>{errorMessage}</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Go back to home screen!</Text>
        </TouchableOpacity>
      </View>
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: Colors.link,
  },
});
