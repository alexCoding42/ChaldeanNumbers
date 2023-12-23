import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import { Spacings } from "constants/Layouts";
import { Colors } from "constants/Colors";
import OutlineButton from "components/atoms/OutlineButton";
import Divider from "components/atoms/Divider";

const NotAuthenticatedScreen = () => {
  return (
    <LinearGradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>
          Login or create a new account to save your favorites and access your
          profile.
        </Text>
        <LinearGradientButton
          style={styles.button}
          buttonText="Login"
          onPress={() => router.push("/login")}
        />
        <OutlineButton
          style={styles.button}
          buttonText="Create a new account"
          onPress={() => router.push("/register")}
        />
        <Divider />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => router.push("/profile/privacy-policy")}
        >
          <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacings.SM,
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    marginTop: Spacings.SM,
    width: "100%",
  },
  text: {
    color: Colors.text,
  },
  touchable: {
    alignSelf: "flex-start",
    marginTop: Spacings.XS,
  },
});

export default NotAuthenticatedScreen;
