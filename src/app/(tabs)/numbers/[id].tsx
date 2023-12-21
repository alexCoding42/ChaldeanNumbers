import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, View } from "components/Themed";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Colors } from "constants/Colors";
import { Spacings } from "constants/Layouts";
import { useQuery } from "@apollo/client";
import { getNumberDetailsById } from "./queries";
import LoadingSpinner from "components/atoms/LoadingSpinner";
import { IChaldeanNumber } from "types";

type Content = keyof IChaldeanNumber;

export default function NumberDetailsScreen() {
  let item: IChaldeanNumber | null = null;
  const { id } = useLocalSearchParams();

  const { data, loading, error } = useQuery(getNumberDetailsById, {
    variables: { id },
  });

  if (error) {
    router.replace({
      pathname: `/error`,
      params: {
        errorTitle: "Cannot get data from database",
        errorMessage: "Try again or contact the support.",
      },
    });
    return null;
  }

  const { numbers } = data || {};
  const numberDetails = numbers?.[0];
  if (numberDetails) {
    item = { ...numberDetails };
  }

  const renderSection = <T extends Content>(title: string, content: T) => {
    return item?.[content] ? (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{item[content]}</Text>
      </View>
    ) : null;
  };

  return (
    <LinearGradientBackground>
      <Stack.Screen
        options={{
          headerTitle: `Number ${item?.chaldean}`,
          headerBackTitle: "Back",
        }}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator indicatorStyle="white">
            <View style={styles.titleContainer}>
              {item?.name ? (
                <Text style={styles.title}>{item.name}</Text>
              ) : null}
            </View>
            {renderSection("Traditional Descriptives", "description")}
            {renderSection(
              `Words that Total to Number ${item?.chaldean ?? ""}`,
              "words"
            )}
            {renderSection(
              `Lifepath for the Number ${item?.chaldean ?? ""}`,
              "lifepath"
            )}
            {renderSection(
              `Challenge for the Number ${item?.chaldean ?? ""}`,
              "challenge"
            )}
            {item?.phrase_title && item?.phrase_description ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  Quirky Phrase to Remember the {item.chaldean ?? ""} By
                </Text>
                <Text style={styles.sectionPhraseTitle}>
                  {item.phrase_title}
                </Text>
                <Text style={styles.sectionContent}>
                  {item.phrase_description}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      )}
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  scrollViewContainer: {
    paddingHorizontal: Spacings.S,
  },
  titleContainer: {
    marginTop: Spacings.XS,
    marginBottom: Spacings.M,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: Spacings.M,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "700",
    paddingBottom: Spacings.XS,
  },
  sectionContent: {
    fontSize: 16,
    color: Colors.text,
  },
  sectionPhraseTitle: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600",
    fontStyle: "italic",
    paddingBottom: Spacings.XS,
  },
});
