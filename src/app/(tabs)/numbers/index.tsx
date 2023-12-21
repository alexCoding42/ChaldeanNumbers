import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { router } from "expo-router";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { IChaldeanNumber } from "types";
import CardNumber from "components/CardNumber";
import { getAllNumbers } from "./queries";
import LoadingSpinner from "components/atoms/LoadingSpinner";

export default function NumbersScreen() {
  const { data, loading, error } = useQuery(getAllNumbers);

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

  return (
    <LinearGradientBackground>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={data.numbers}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: IChaldeanNumber }) => (
            <CardNumber item={item} />
          )}
        />
      )}
    </LinearGradientBackground>
  );
}
