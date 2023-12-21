import { Colors } from "constants/Colors";
import { Borders, Spacings } from "constants/Layouts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: Colors.text,
    fontWeight: "500",
    borderRadius: Borders.RADIUS.BUTTON,
    flexDirection: "row",
    paddingHorizontal: Spacings.SM,
    alignItems: "center",
    elevation: 12,
    shadowColor: Colors.black,
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
