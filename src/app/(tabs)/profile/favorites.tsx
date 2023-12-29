import React from "react";
import { FlatList, StyleSheet } from "react-native";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Text, View } from "components/Themed";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { GET_FAVORITES } from "graphql/queries";
import { useQuery } from "@apollo/client";
import { router, useFocusEffect } from "expo-router";
import { IFavorite } from "types";
import LoadingSpinner from "components/atoms/LoadingSpinner";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Gradients } from "constants/Colors";
import { Spacings } from "constants/Layouts";
import Toast from "react-native-root-toast";

export default function FavoritesScreen() {
  const user = useUserData();
  const { isAuthenticated } = useAuthenticationStatus();

  const { data, loading, error, refetch } = useQuery(GET_FAVORITES, {
    skip: !isAuthenticated,
    variables: { userId: user?.id || "" },
  });

  useFocusEffect(() => {
    refetch();
  });

  if (error) {
    router.replace({
      pathname: `/error`,
      params: {
        errorTitle: "Cannot get favorites from database.",
        errorMessage: "Please try again or contact the support.",
      },
    });

    Toast.show("Database error", {
      duration: Toast.durations.LONG,
      backgroundColor: Colors.red,
    });
    return null;
  }

  const getFavoriteCount = (type: string) =>
    data?.favorites.filter((fav: IFavorite) => fav.type === type).length ?? 0;

  const renderFavoriteItem = ({ item }: { item: IFavorite }) => {
    const isName = item.type === "name";
    const formattedType = isName ? "Name" : "Date";

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemValue}>
          {formattedType}: {item.value}
        </Text>
        <Text style={styles.itemValue}> / Number: {item.chaldeanNumber}</Text>
      </View>
    );
  };

  const pluralizeType = (category: string): string => {
    const singularType = category.endsWith("s")
      ? category.slice(0, -1)
      : category;
    return singularType.toLowerCase();
  };

  const renderCategory = (category: string) => {
    const normalizedCategory = pluralizeType(category);
    const filteredFavorites = data?.favorites.filter(
      (fav: IFavorite) => fav.type === normalizedCategory
    );

    return (
      <View>
        <LinearGradient
          colors={Gradients.yellow.default}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 0.7, y: 1 }}
        >
          <Text style={styles.favoriteCategoryName}>{category}</Text>
        </LinearGradient>

        {filteredFavorites && filteredFavorites.length > 0 ? (
          <FlatList data={filteredFavorites} renderItem={renderFavoriteItem} />
        ) : (
          <Text style={styles.noFav}>No favorites</Text>
        )}
      </View>
    );
  };

  return (
    <LinearGradientBackground>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>{getFavoriteCount("name")}</Text>
              <Text style={styles.infoBoxText}>Number of names favorite</Text>
            </View>
            <View style={styles.border} />
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>{getFavoriteCount("date")}</Text>
              <Text style={styles.infoBoxText}>Number of dates favorite</Text>
            </View>
          </View>
          {renderCategory("Names")}
          {renderCategory("Dates")}
        </>
      )}
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  infoBoxWrapper: {
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
    borderTopColor: Colors.text,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginBottom: 18,
  },
  infoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    borderRightColor: Colors.text,
    borderRightWidth: 1,
    height: "100%", // Match the height of the infoBoxWrapper
  },
  infoBoxText: {
    color: Colors.text,
  },
  itemContainer: {
    flexDirection: "row",
    padding: Spacings.XS,
  },
  itemValue: {
    color: Colors.text,
  },
  favoriteCategoryName: {
    padding: Spacings.XS,
    color: Colors.text,
    fontWeight: "600",
  },
  noFav: {
    padding: Spacings.XS,
    color: Colors.text,
  },
});
