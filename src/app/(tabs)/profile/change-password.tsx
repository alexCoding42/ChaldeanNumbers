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
import { useChangePassword, useSignOut, useUserData } from "@nhost/react";
import { Text, View } from "components/Themed";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Colors } from "constants/Colors";
import { Borders, Spacings } from "constants/Layouts";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useApolloClient } from "@apollo/client";

export default function ChangePasswordScreen() {
  const user = useUserData();
  const { signOut } = useSignOut();
  const client = useApolloClient();

  const { changePassword, isLoading } = useChangePassword();

  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmNewPasswordInputRef = useRef<TextInput>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function handleChangePassword() {
    try {
      if (!newPassword || !confirmNewPassword) {
        Alert.alert("Error", "All fields must be filled");
        return;
      } else if (newPassword !== confirmNewPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const res = await changePassword(newPassword.trim());

      if (res.isError) {
        throw new Error(res?.error?.message);
      } else {
        Alert.alert(
          "Success",
          "Password has been changed successfully. Please login again into the application."
        );
        signOut();
        client.resetStore();
        router.replace("/");
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
              <Text style={styles.textInputTitle}>New Password</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={newPasswordInputRef}
                  secureTextEntry
                  returnKeyType="next"
                  placeholder="your new password"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={newPassword}
                  onChangeText={(value) => setNewPassword(value)}
                  onSubmitEditing={() =>
                    confirmNewPasswordInputRef.current?.focus()
                  }
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setNewPassword("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInputTitle}>Confirm new Password</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={confirmNewPasswordInputRef}
                  secureTextEntry
                  returnKeyType="done"
                  placeholder="Confirm your new password"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={confirmNewPassword}
                  onChangeText={(value) => setConfirmNewPassword(value)}
                  onSubmitEditing={handleChangePassword}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setConfirmNewPassword("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <LinearGradientButton
                style={{ marginTop: 20 }}
                buttonText="Change password"
                onPress={handleChangePassword}
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
