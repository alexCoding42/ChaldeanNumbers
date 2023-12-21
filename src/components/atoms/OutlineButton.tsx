import { Colors } from "constants/Colors";
import { Borders } from "constants/Layouts";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type OutlineButtonProps = {
  onPress: () => void;
  buttonText: string;
  isLoading?: boolean;
  style?: TouchableOpacity["props"]["style"];
};

export default function LinearGradientButton({
  onPress,
  buttonText,
  isLoading = false,
  style,
}: OutlineButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading}
      style={[styles.button, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.text} />
      ) : (
        <Text style={styles.btnText}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.yellow.dark,
    borderWidth: 2,
    borderRadius: Borders.RADIUS.BUTTON,
    height: Borders.RADIUS.BUTTON,
  },
  btnText: {
    fontWeight: "bold",
    color: Colors.text,
  },
});
