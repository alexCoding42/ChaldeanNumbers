import React, { useCallback, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Text, View } from "components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import Colors from "constants/Colors";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "graphql/queries";
import { CHALDEAN_NUMBERS } from "constants/Numbers";
import { getArrayOfNumbersFromSplittedName, getTotal } from "utils/computation";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { IFavorite, IToast } from "types";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import Toast from "components/atoms/Toast";

export default function NameScreen() {
  const validName = "^[a-zA-Z0-9\\s]+$";
  const inputDateRef = React.createRef<TextInput>();

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
  const [toasts, setToasts] = useState<IToast[]>([]);

  const [getFavorites, { loading: isfetchingFavorites }] = useLazyQuery(
    GET_FAVORITES,
    {
      variables: {
        userId: user?.id,
      },
      fetchPolicy: "network-only",
    }
  );

  const [insertFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(DELETE_FAVORITE);

  const renderFavoriteIcon = useCallback(() => {
    return (
      <MaterialIcons
        name={isNameFavorite ? "favorite" : "favorite-outline"}
        size={18}
        color={Colors.light.delete}
      />
    );
  }, [isNameFavorite]);

  const clearField = () => {
    inputDateRef?.current?.clear();
    setInputName("");
    setFirstSubNumber(null);
    setChaldeanResult(null);
  };

  const calculateName = async () => {
    setFirstSubNumber(null);
    setChaldeanResult(null);
    const name = inputName.trim();

    if (name === "") {
      return;
    } else if (!name.match(validName)) {
      Alert.alert("Warning", "Name can only contain letter and number");
      return;
    }

    Keyboard.dismiss();
    setIsButtonLoading(true);

    const favoriteData = await checkIfNameIsFavorite();
    setIsNameFavorite(favoriteData?.isNameFavorite);
    setNameFavoriteId(favoriteData?.nameFavoriteId);

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
      setToasts([
        ...toasts,
        {
          type: "danger",
          message: "Favorite removed",
          color: Colors.light.delete,
        },
      ]);
    } else {
      addFavorite();
      setToasts([
        ...toasts,
        {
          type: "success",
          message: "Favorite added",
          color: Colors.yellow.success,
        },
      ]);
    }
  };

  const addFavorite = async () => {
    try {
      const res = await insertFavorite({
        variables: {
          type: "name",
          value: inputName.trim().toLowerCase(),
          userId: user?.id,
        },
      });
      setIsNameFavorite(true);
      setNameFavoriteId(res.data.insert_favorites.returning[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async () => {
    try {
      await removeFavorite({
        variables: {
          id: nameFavoriteId,
        },
      });
      setIsNameFavorite(false);
      setNameFavoriteId("");
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfNameIsFavorite = async () => {
    try {
      const name = inputName.trim().toLowerCase();
      const { data } = await getFavorites();

      if (isfetchingFavorites) {
        return { isNameFavorite: false, nameFavoriteId: "" };
      } else if (data) {
        const favorite = data.favorites.find(
          (fav: IFavorite) => fav.value === name
        );
        return {
          isNameFavorite: favorite?.id != null,
          nameFavoriteId: favorite?.id ?? "",
        };
      }
    } catch (error) {
      console.error(error);
      return { isNameFavorite: false, nameFavoriteId: "" };
    }
  };

  return (
    <LinearGradientBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {toasts.map((toast, index) => (
            <Toast
              key={index}
              message={toast.message}
              color={toast.color}
              onHide={() => {
                setToasts((toasts) =>
                  toasts.filter((currentToast) => currentToast !== toast)
                );
              }}
            />
          ))}
          <View style={styles.container}>
            <Text style={styles.title}>Find the chaldean number of a name</Text>
            <Text style={styles.textInputTitle}>Full Name</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                testID="nameTextInput"
                ref={inputDateRef}
                placeholder="Ex: Bernard Hackwell"
                placeholderTextColor={Colors.light.tabIconDefault}
                autoCapitalize="none"
                style={styles.input}
                value={inputName}
                onChangeText={(value) => setInputName(value)}
              />
              <Pressable style={styles.clearIcon} onPress={clearField}>
                <MaterialIcons
                  color={Colors.light.text}
                  name="clear"
                  size={20}
                />
              </Pressable>
            </View>
            <LinearGradientButton
              buttonText="Calculate"
              onPress={calculateName}
              isLoading={isButtonLoading || isfetchingFavorites}
            />

            <View style={styles.resultContainer}>
              {firstSubNumber ? (
                <View style={styles.resultSection}>
                  <Text style={styles.resultLabel}>First Sub Number:</Text>
                  <Text style={styles.resultText}>{firstSubNumber}</Text>
                </View>
              ) : null}
              {chaldeanResult ? (
                <View style={styles.resultSection}>
                  <Text style={styles.resultLabel}>Chaldean:</Text>
                  <Text style={styles.resultText}>{chaldeanResult}</Text>
                  {isAuthenticated && (
                    <Pressable onPress={handleFavorite}>
                      {renderFavoriteIcon()}
                    </Pressable>
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearGradientBackground>
  );
}
