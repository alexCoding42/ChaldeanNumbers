import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Text, View } from "components/Themed";
import { Spacings } from "constants/Layouts";
import { Colors } from "constants/Colors";

const IMAGE = require("../../../../assets/images/book_cover.jpg");

export default function SourceScreen() {
  return (
    <LinearGradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={IMAGE} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.text}>
              This application was inspired by the following book.
            </Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.boldText}>Author:</Text>
            <Text style={styles.text}>Heather Alicia Lagan</Text>
          </View>
          <View>
            <Text style={styles.boldText}>Summary:</Text>
            <Text style={styles.text}>
              Gain insight into your gifts and challenges with this simple and
              empowering divinatory system. Chaldean numerology paints a clear
              picture of you and your personal blueprint - your essence,
              talents, desires, lessons, and ideal direction for this lifetime.
              This introductory guide presents highly effective techniques for
              decoding the energetic vibrations and information held in names,
              birthdates, addresses, phone numbers, and much more. Master
              numerologist Heather Alicia Lagan has simplified Chaldean
              numerology, making it both accessible and practical. She offers
              detailed sample readings of three celebrities - Apolo Anton Ohno
              (an American speed skater - no I hadn't heard of him either!),
              Leonardo DiCaprio, and Drew Barrymore - to help readers
              understand, share, and benefit from this treasury of ancient
              knowledge. Chaldean numerology, the original form of numerology
              upon which all later systems were based, offers guidance,
              inspirational and enlightening messages, and a framework for
              setting or achieving goals.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacings.S,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  imageContainer: {
    alignSelf: "center",
  },
  image: {
    marginVertical: Spacings.S,
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  textContainer: {
    width: "100%",
  },
  text: {
    marginBottom: Spacings.XS,
    color: Colors.text,
  },
  boldText: {
    color: Colors.text,
    fontWeight: "bold",
  },
});
