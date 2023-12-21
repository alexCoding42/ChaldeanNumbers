import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Window = {
  width,
  height,
  isSmallDevice: width < 375,
};

export const Spacings = {
  XXS: 4,
  XS: 8,
  S: 16,
  SM: 20,
  M: 24,
  L: 32,
  XL: 40,
  XXL: 48,
  XXXL: 52,
};

export const Borders = {
  RADIUS: {
    CIRCLE: 80,
    BUTTON: 50,
    CARD: 20,
    LIST: 15,
    SQUARE: 10,
    LIGHT: 8,
    LIGHTER: 5,
  },
  WIDTH: {
    THINNER: 2,
    THIN: 3,
    NORMAL: 4,
    THICK: 8,
  },
};
