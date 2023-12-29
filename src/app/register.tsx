import React, { createRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-root-toast";
import { Text, View } from "components/Themed";
import { Borders, Spacings } from "constants/Layouts";
import { Colors } from "constants/Colors";
import { useSignUpEmailPassword } from "@nhost/react";
import { router } from "expo-router";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { MaterialIcons } from "@expo/vector-icons";
import LinearGradientButton from "components/atoms/LinearGradientButton";

export default function RegisterScreen() {
  const usernameInputRef = createRef<TextInput>();
  const emailInputRef = createRef<TextInput>();
  const passwordInputRef = createRef<TextInput>();
  const confirmPasswordInputRef = createRef<TextInput>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();

  const register = async () => {
    try {
      if (!username || !email || !password || !confirmPassword) {
        Toast.show(`Error cannot register.\nAll fields must be filled.`, {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.red,
        });
        return;
      } else if (password !== confirmPassword) {
        Toast.show(`Error cannot register.\nPassword do not match.`, {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.red,
        });
        return;
      }
      const { isError, error } = await signUpEmailPassword(
        email.trim(),
        password.trim(),
        {
          displayName: username.trim(),
          allowedRoles: ["user"],
        }
      );
      if (isError) {
        throw new Error(error?.message);
      } else if (!isError && !error) {
        Toast.show(
          `Successfully registered.\nYour account has been created but needs to be verified. Please check your mailbox (and spam) and follow the verification procedure to verify your email.`,
          {
            duration: 8000,
            backgroundColor: Colors.green,
          }
        );
        router.replace("/login");
      }
    } catch (error) {
      Toast.show(`Error cannot register.\n${(error as Error).message}`, {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
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
              <Text style={styles.textInputTitle}>Username</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={usernameInputRef}
                  returnKeyType="next"
                  keyboardType="default"
                  placeholder="Username"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setUsername("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInputTitle}>Email</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={emailInputRef}
                  returnKeyType="next"
                  keyboardType="email-address"
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
                  returnKeyType="next"
                  placeholder="your password"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setPassword("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInputTitle}>Confirm password</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={confirmPasswordInputRef}
                  secureTextEntry
                  returnKeyType="done"
                  placeholder="your confirmed password"
                  placeholderTextColor={Colors.tabIconUnselected}
                  autoCapitalize="none"
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={(value) => setConfirmPassword(value)}
                  onSubmitEditing={register}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setConfirmPassword("")}
                >
                  <MaterialIcons color={Colors.text} name="clear" size={20} />
                </TouchableOpacity>
              </View>
              <LinearGradientButton
                style={{ marginTop: 20 }}
                buttonText="Register"
                onPress={register}
                isLoading={isLoading}
              />
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signUpText}>
                  Already have an account?{" "}
                  <Text style={styles.signInTextColored}>Login</Text> now
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
  signUpText: {
    marginTop: Spacings.SM,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  signInTextColored: {
    color: Colors.yellow.dark,
  },
});
