import { View, Text, StyleSheet, Pressable } from "react-native";
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
          Login into your account or create a new account to retrieve your
          favorites and access to your settings
        </Text>
        <LinearGradientButton
          style={styles.button}
          buttonText="Sign in"
          onPress={() => router.push("/sign-in")}
        />
        <OutlineButton
          style={styles.button}
          buttonText="Create a new account"
          onPress={() => router.push("/sign-up")}
        />
        <Divider />
        <Pressable
          style={styles.touchable}
          onPress={() => router.push("/profile/privacy-policy")}
        >
          <Text style={styles.text}>Privacy Policy</Text>
        </Pressable>
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
    textAlign: "left",
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
