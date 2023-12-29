import { FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { router } from "expo-router";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { IChaldeanNumber } from "types";
import CardNumber from "components/CardNumber";
import LoadingSpinner from "components/atoms/LoadingSpinner";
import Toast from "react-native-root-toast";
import { Colors } from "constants/Colors";

const getAllNumbers = gql`
  query {
    numbers(where: { locale: { _eq: "en" } }, order_by: { chaldean: asc }) {
      id
      chaldean
      challenge
      description
      lifepath
      locale
      name
      phrase_description
      phrase_title
      words
    }
  }
`;

export default function NumbersScreen() {
  const { data, loading, error } = useQuery(getAllNumbers);

  if (error) {
    router.replace({
      pathname: `/error`,
      params: {
        errorTitle: "Cannot get data from database.",
        errorMessage: "Please try again or contact the support.",
      },
    });

    Toast.show("Database error", {
      duration: Toast.durations.LONG,
      backgroundColor: Colors.red,
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
