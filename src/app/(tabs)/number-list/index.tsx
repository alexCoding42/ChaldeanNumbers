import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { IChaldeanNumber } from "types";
import CardNumber from "components/CardNumber";
import { getNumberList } from "./queries";
import LoadingSpinner from "components/atoms/LoadingSpinner";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NumberListScreen() {
  const { data, loading, error } = useQuery(getNumberList);

  if (error) {
    console.warn(error);
    // navigation.navigate("Error", {
    //   errorTitle: "Cannot get data from database",
    //   errorMessage: "Try again or contact the support.",
    // });
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
