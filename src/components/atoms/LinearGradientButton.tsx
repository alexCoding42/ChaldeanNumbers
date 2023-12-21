import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Borders } from "constants/Layouts";
import Colors, { Gradients } from "constants/Colors";

type LinearGradientButtonProps = {
  onPress: () => void;
  buttonText: string;
  isLoading?: boolean;
  colors?: string[];
  style?: TouchableOpacity["props"]["style"];
};

export default function LinearGradientButton({
  onPress,
  buttonText,
  isLoading = false,
  colors = Gradients.yellow.default,
  style,
}: LinearGradientButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading}
      style={style}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0.7, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.linearGradientBtn}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.light.text} />
        ) : (
          <Text style={styles.btnText}>{buttonText}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linearGradientBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Borders.RADIUS.BUTTON,
    height: Borders.RADIUS.BUTTON,
  },
  btnText: {
    fontWeight: "bold",
    color: Colors.light.text,
  },
});
