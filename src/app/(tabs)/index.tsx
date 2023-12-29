import React, { createRef, useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-root-toast";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { useMutation, useQuery } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Text, View } from "components/Themed";
import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "graphql/queries";
import { CHALDEAN_NUMBERS } from "constants/Numbers";
import { getArrayOfNumbersFromSplittedName, getTotal } from "utils/computation";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import { Colors } from "constants/Colors";
import { Borders, Spacings } from "constants/Layouts";
import { IFavorite } from "types";

export default function NameScreen() {
  const validName = "^[a-zA-Z0-9\\s]+$";
  const inputNameRef = createRef<TextInput>();

  const { isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();

  const [inputName, setInputName] = useState("");
  const [firstSubNumber, setFirstSubNumber] = useState<number | null>(null);
  const [chaldeanResult, setChaldeanResult] = useState<number | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isNameFavorite, setIsNameFavorite] = useState<boolean | undefined>(
    false
  );
  const [nameFavoriteId, setNameFavoriteId] = useState("");

  const { data: favoritesData, loading: isfetchingFavorites } = useQuery(
    GET_FAVORITES,
    {
      skip: !isAuthenticated,
      variables: {
        userId: isAuthenticated ? user?.id : "",
      },
    }
  );

  const [insertFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(DELETE_FAVORITE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const favoriteData = await checkIfNameIsFavorite();
          setIsNameFavorite(favoriteData?.isNameFavorite);
          setNameFavoriteId(favoriteData?.nameFavoriteId);
        }
      } catch (error) {
        Toast.show("Error when fetching favorites", {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.red,
        });
      }
    };

    fetchData();
  }, [isAuthenticated, inputName]);

  const clearField = () => {
    inputNameRef?.current?.clear();
    setInputName("");
    setFirstSubNumber(null);
    setChaldeanResult(null);
  };

  const calculateName = async () => {
    setFirstSubNumber(null);
    setChaldeanResult(null);
    const name = inputName.trim();

    if (name === "") {
      return null;
    } else if (!name.match(validName)) {
      Toast.show("Name can only contain letter and number", {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
      return null;
    }

    Keyboard.dismiss();
    setIsButtonLoading(true);

    setTimeout(() => {
      const arrayOfNumbersFromName = splitNameAndReturnArrayOfNumbers(name);
      const firstSubNum = getTotalOfArrayNumbers(arrayOfNumbersFromName);

      if (CHALDEAN_NUMBERS.includes(firstSubNum)) {
        setChaldeanResult(firstSubNum);
      } else {
        let total = firstSubNum;
        while (!CHALDEAN_NUMBERS.includes(total)) {
          total = getTotal(total);
        }
        setFirstSubNumber(firstSubNum);
        setChaldeanResult(total);
      }

      setIsButtonLoading(false);
    }, 1000);
  };

  const getTotalOfArrayNumbers = (numbers: number[]) => {
    return numbers
      .map(Number)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  };

  const splitNameAndReturnArrayOfNumbers = (name: string) => {
    const splittedName = name
      .toLowerCase()
      .trim()
      .split("")
      .map((item) => item.trim())
      .filter((element) => element !== "");
    return getArrayOfNumbersFromSplittedName(splittedName);
  };

  const handleFavorite = async () => {
    if (isNameFavorite) {
      deleteFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    try {
      const res = await insertFavorite({
        variables: {
          type: "name",
          value: inputName.trim().toLowerCase(),
          chaldeanNumber: chaldeanResult,
          userId: user?.id,
        },
      });

      if (res.data.insert_favorites_one.userId === user?.id) {
        setIsNameFavorite(true);
        setNameFavoriteId(res.data.insert_favorites_one.id);
        Toast.show("Favorite added", {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.green,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Toast.show("Error when adding favorite", {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
    }
  };

  const deleteFavorite = async () => {
    try {
      const res = await removeFavorite({
        variables: {
          id: nameFavoriteId,
        },
      });
      if (res.data.delete_favorites_by_pk.id === nameFavoriteId) {
        setIsNameFavorite(false);
        setNameFavoriteId("");
        Toast.show("Favorite removed", {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.red,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Toast.show("Error when deleting favorite", {
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
      });
    }
  };

  const checkIfNameIsFavorite = () => {
    try {
      const name = inputName.trim().toLowerCase();
      const favorites = favoritesData?.favorites || [];

      const favorite = favorites.find((fav: IFavorite) => fav.value === name);

      return {
        isNameFavorite: favorite?.id != null,
        nameFavoriteId: favorite?.id || "",
      };
    } catch (error) {
      return { isNameFavorite: false, nameFavoriteId: "" };
    }
  };

  const renderFavoriteIcon = useCallback(() => {
    return (
      <MaterialIcons
        name={isNameFavorite ? "favorite" : "favorite-outline"}
        size={24}
        color={Colors.red}
      />
    );
  }, [isNameFavorite]);

  return (
    <LinearGradientBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Find the chaldean number of a name</Text>
            <Text style={styles.textInputTitle}>Full Name</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                testID="nameTextInput"
                ref={inputNameRef}
                placeholder="Ex: Bernard Hackwell"
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                style={styles.input}
                value={inputName}
                onChangeText={(value) => setInputName(value)}
              />
              <TouchableOpacity style={styles.clearIcon} onPress={clearField}>
                <MaterialIcons color={Colors.text} name="clear" size={20} />
              </TouchableOpacity>
            </View>
            <LinearGradientButton
              buttonText="Calculate"
              onPress={calculateName}
              isLoading={isButtonLoading || isfetchingFavorites}
            />

            <View style={styles.resultContainer}>
              {firstSubNumber && (
                <View style={styles.resultSection}>
                  <Text style={styles.resultLabel}>First Sub Number:</Text>
                  <Text style={styles.resultText}>{firstSubNumber}</Text>
                </View>
              )}
              {chaldeanResult && (
                <View style={styles.resultSection}>
                  <Text style={styles.resultLabel}>Chaldean:</Text>
                  <Text style={styles.resultText}>{chaldeanResult}</Text>
                </View>
              )}
              {isAuthenticated && chaldeanResult && user && (
                <View style={styles.resultSection}>
                  <Text style={styles.resultLabel}>
                    {isNameFavorite
                      ? "Remove this name from favorite:"
                      : "Add this name to favorite:"}
                  </Text>
                  <TouchableOpacity
                    onPress={handleFavorite}
                    style={styles.resultText}
                  >
                    {renderFavoriteIcon()}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacings.SM,
  },
  container: {
    width: "100%",
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
    color: Colors.text,
    fontWeight: "500",
    borderRadius: Borders.RADIUS.BUTTON,
    flexDirection: "row",
    paddingHorizontal: Spacings.SM,
    alignItems: "center",
    backgroundColor: Colors.black.withOpacity,
  },
  clearIcon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: Spacings.SM,
    flexDirection: "column",
  },
  resultSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginHorizontal: 10,
  },
});
