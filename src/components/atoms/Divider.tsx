import { Colors } from "constants/Colors";
import { Spacings } from "constants/Layouts";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider() {
  return (
    <View
      style={{
        width: "100%",
        margin: Spacings.S,
        borderColor: Colors.text,
        borderWidth: StyleSheet.hairlineWidth,
      }}
    ></View>
  );
}
