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
import { useChangePassword, useSignOut } from "@nhost/react";
import { Text, View } from "components/Themed";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Colors } from "constants/Colors";
import { Borders, Spacings } from "constants/Layouts";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useApolloClient } from "@apollo/client";
import Toast from "react-native-root-toast";

export default function ChangePasswordScreen() {
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
        Toast.show(
          `Error cannot change password.\nAll fields must be filled.`,
          {
            duration: Toast.durations.LONG,
            backgroundColor: Colors.red,
          }
        );
        return;
      } else if (newPassword !== confirmNewPassword) {
        Toast.show(`Error cannot change password.\nPassword do not match.`, {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.red,
        });
        return;
      }

      const { isError, error, isSuccess } = await changePassword(
        newPassword.trim()
      );

      if (isError) {
        throw new Error(error?.message);
      } else if (isSuccess) {
        Toast.show(
          `Success.\nYour password has been change. Please login again into the application.`,
          {
            duration: 4000,
            backgroundColor: Colors.green,
          }
        );
        signOut();
        client.resetStore();
        router.replace("/login");
      }
    } catch (error) {
      Toast.show(`Error cannot change password.\n${(error as Error).message}`, {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
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
