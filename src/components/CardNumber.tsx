import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { Spacings } from "constants/Layouts";
import Colors from "constants/Colors";
import { IChaldeanNumber } from "types";
import { router } from "expo-router";

const { width } = Dimensions.get("screen");

export default function CardNumber({ item }: { item: IChaldeanNumber }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={item.id}
      onPress={() => {
        // router.replace({
        //   pathname: `/number-list/details/${item.id}`,
        //   params: { item: item },
        // });
      }}
    >
      <View style={styles.card}>
        <Text style={styles.cardTextNumericValue}>{item.chaldean}</Text>
        <Text style={styles.cardTextName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: Spacings.XS,
    width: width / 2 - Spacings.SM,
    height: 80,
    backgroundColor: Colors.light.text,
    padding: Spacings.XXS,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextNumericValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  cardTextName: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
});
