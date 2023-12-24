import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { createRef, useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "components/Themed";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Borders, Spacings } from "constants/Layouts";
import { Colors } from "constants/Colors";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { IFavorite, IToast } from "types";
import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "graphql/queries";
import { CHALDEAN_NUMBERS } from "constants/Numbers";
import Toast from "components/atoms/Toast";
import { getTotal } from "utils/computation";
import LinearGradientButton from "components/atoms/LinearGradientButton";
import DatePicker from "react-native-date-picker";

export default function DateScreen() {
  const { isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();

  const inputDateRef = createRef<TextInput>();

  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState("");
  const [firstSubNumber, setFirstSubNumber] = useState<number | null>(null);
  const [chaldeanResult, setChaldeanResult] = useState<number | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDateFavorite, setIsDateFavorite] = useState<boolean | undefined>(
    false
  );
  const [dateFavoriteId, setDateFavoriteId] = useState("");
  const [toasts, setToasts] = useState<IToast[]>([]);

  const { data: favoritesData, loading: isfetchingFavorites } = useQuery(
    GET_FAVORITES,
    {
      skip: !isAuthenticated,
      variables: {
        userId: isAuthenticated ? user?.id : "",
      },
      fetchPolicy: "network-only",
    }
  );

  const [insertFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(DELETE_FAVORITE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const favoriteData = await checkIfDateIsFavorite();
          setIsDateFavorite(favoriteData?.isDateFavorite);
          setDateFavoriteId(favoriteData?.dateFavoriteId);
        }
      } catch (error) {
        console.warn("Error", error);
      }
    };

    fetchData();
  }, [isAuthenticated, inputDate]);

  const calculateDate = async () => {
    setFirstSubNumber(null);
    setChaldeanResult(null);

    if (inputDate === "") {
      return;
    }

    Keyboard.dismiss();
    setIsButtonLoading(true);

    try {
      if (isAuthenticated) {
        const favoriteData = await checkIfDateIsFavorite();
        setIsDateFavorite(favoriteData?.isDateFavorite);
        setDateFavoriteId(favoriteData?.dateFavoriteId);
      }
    } catch (error) {
      console.warn("Error", error);
    }

    setTimeout(() => {
      const formattedDate = format(new Date(date), "yyyyMMdd");
      const firstSubNum = getTotal(formattedDate);

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

  const clearField = () => {
    inputDateRef?.current?.clear();
    setInputDate("");
    setFirstSubNumber(null);
    setChaldeanResult(null);
  };

  const handleDatePicker = (d: Date) => {
    clearField();
    setIsDatePickerOpen(false);
    setDate(d);
    setInputDate(format(d, "yyyy-MM-dd"));
  };

  const handleFavorite = async () => {
    if (isDateFavorite) {
      deleteFavorite();
      setToasts([
        ...toasts,
        {
          type: "danger",
          message: "Favorite removed",
          color: Colors.red,
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
          type: "date",
          value: inputDate,
          chaldeanNumber: chaldeanResult,
          userId: user?.id,
        },
      });
      setIsDateFavorite(true);
      setDateFavoriteId(res.data.insert_favorites.returning[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async () => {
    try {
      await removeFavorite({
        variables: {
          id: dateFavoriteId,
        },
      });
      setIsDateFavorite(false);
      setDateFavoriteId("");
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfDateIsFavorite = async () => {
    try {
      const date = inputDate;
      const favorites = favoritesData?.favorites || [];

      const favorite = favorites.find((fav: IFavorite) => fav.value === date);

      return {
        isDateFavorite: favorite?.id != null,
        dateFavoriteId: favorite?.id || "",
      };
    } catch (error) {
      console.error(error);
      return { isDateFavorite: false, dateFavoriteId: "" };
    }
  };

  const handleToast = () => {
    return toasts.map((toast, index) => (
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
    ));
  };

  const renderFavoriteIcon = useCallback(() => {
    return (
      <MaterialIcons
        name={isDateFavorite ? "favorite" : "favorite-outline"}
        size={24}
        color={Colors.red}
      />
    );
  }, [isDateFavorite]);

  return (
    <LinearGradientBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {handleToast()}
          <View style={styles.container}>
            <Text style={styles.title}>Find the chaldean number of a date</Text>
            <Text style={styles.textInputTitle}>Full Date</Text>
            <TouchableOpacity
              style={styles.textInputContainer}
              onPressIn={() => setIsDatePickerOpen(true)}
            >
              <TextInput
                ref={inputDateRef}
                keyboardType="number-pad"
                placeholder="Ex: 2022-12-31 (year-month-day)"
                placeholderTextColor={Colors.tabIconUnselected}
                style={styles.input}
                editable={false}
                onPressIn={() => setIsDatePickerOpen(true)}
                value={inputDate}
              />
              <TouchableOpacity style={styles.clearIcon} onPress={clearField}>
                <MaterialIcons color={Colors.text} name="clear" size={20} />
              </TouchableOpacity>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={isDatePickerOpen}
              date={date}
              onConfirm={(d) => handleDatePicker(d)}
              onCancel={() => {
                setIsDatePickerOpen(false);
              }}
            />
            <LinearGradientButton
              buttonText="Calculate"
              onPress={calculateDate}
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
                    {isDateFavorite
                      ? "Remove this date from favorite:"
                      : "Add this date to favorite:"}
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
    backgroundColor: Colors.black.withOpacity,
    color: Colors.text,
    fontWeight: "500",
    borderRadius: Borders.RADIUS.BUTTON,
    flexDirection: "row",
    paddingHorizontal: Spacings.S,
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
  resultContainer: {
    marginTop: 20,
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
