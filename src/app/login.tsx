import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

import { useNhostClient, useSignInEmailPassword } from "@nhost/react";
import Toast from "react-native-root-toast";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "constants/Colors";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import { router } from "expo-router";
import { Borders, Spacings } from "constants/Layouts";

export default function LoginScreen() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInEmailPassword, isLoading } = useSignInEmailPassword();
  const { auth } = useNhostClient();

  const login = async () => {
    if (!email || !password) {
      Toast.show(`Error cannot login.\nAll fields must be filled.`, {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
      return;
    }

    try {
      const { isError, isSuccess, error, needsEmailVerification } =
        await signInEmailPassword(email.trim(), password.trim());
      if (needsEmailVerification) {
        Alert.alert(
          "Error cannot login.",
          "Your account is not verified. Please check your mailbox (and spam) and follow the verification procedure to verify your email. If you did not receive any email, or if the link has expired you can ask for a new confirmation link.",
          [
            {
              text: "Ask for a new confirmation link",
              onPress: () => sendNewConfirmationLink(),
            },
            { text: "Close", onPress: () => {} },
          ]
        );
        return;
      } else if (isError) {
        throw new Error(error?.message);
      } else if (isSuccess) {
        router.replace("/(tabs)");
      }
    } catch (error) {
      Toast.show(`Error cannot login.\n${(error as Error).message}`, {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
    }
  };

  const sendNewConfirmationLink = async () => {
    try {
      const { error } = await auth.sendVerificationEmail({
        email: email,
      });
      if (error) {
        throw new Error(error?.message);
      } else if (!error) {
        Toast.show(
          "A new confirmation link has been sent, please check your email and make sure to check your spam inbox as well to follow the procedure.",
          {
            duration: 5000,
            backgroundColor: Colors.green,
          }
        );
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
      return;
    }
  };

  return (
    <LinearGradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.textInputTitle}>Email</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={emailInputRef}
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder="your.email@gmail.com"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setEmail("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInputTitle}>Password</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={passwordInputRef}
                  secureTextEntry
                  returnKeyType="done"
                  placeholder="your password"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  onSubmitEditing={login}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setPassword("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <LinearGradientButton
                style={{ marginTop: 20 }}
                buttonText="Login"
                onPress={login}
                isLoading={isLoading}
              />
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.signUpText}>
                  Don't have an account yet?{" "}
                  <Text style={styles.signUpTextColored}>Register</Text> now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/reset-password")}>
                <Text style={styles.forgotPasswordText}>
                  I have forgotten my password
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacings.M,
    paddingHorizontal: Spacings.SM,
  },
  title: {
    color: Colors.text,
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
  },
  textInputTitle: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: Borders.RADIUS.BUTTON,
    backgroundColor: Colors.black.default,
    color: Colors.text,
    fontWeight: "500",
    borderRadius: Borders.RADIUS.BUTTON,
    flexDirection: "row",
    paddingHorizontal: Spacings.SM,
    alignItems: "center",
    elevation: 12,
    shadowColor: Colors.black.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  clearIcon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
  },
  signUpText: {
    marginTop: Spacings.SM,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpTextColored: {
    color: Colors.yellow.dark,
  },
  forgotPasswordText: {
    marginTop: Spacings.SM,
    color: Colors.text,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
