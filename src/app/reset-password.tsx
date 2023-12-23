import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import { useResetPassword } from "@nhost/react";
import { Text, View } from "components/Themed";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Colors } from "constants/Colors";
import { Borders, Spacings } from "constants/Layouts";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function ResetPasswordScreen() {
  const { resetPassword, isLoading } = useResetPassword();
  const emailInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");

  async function sendResetPassword() {
    if (email === "") {
      Alert.alert("Error", "Please provide an email.");
      return;
    }

    try {
      const res = await resetPassword(email);

      if (res.isError) {
        throw new Error(res?.error?.message);
      } else {
        Alert.alert(
          "Success",
          "A reset link has been sent. Please check your mailbox and follow the procedure to change your password."
        );
        router.replace("/login");
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  }

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
                  onSubmitEditing={sendResetPassword}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setEmail("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <LinearGradientButton
                style={{ marginTop: 20 }}
                buttonText="Reset password"
                onPress={sendResetPassword}
                isLoading={isLoading}
              />
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
    backgroundColor: Colors.black.withOpacity,
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
});
