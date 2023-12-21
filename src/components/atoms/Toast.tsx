import { Animated, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import Colors from "constants/Colors";

type ToasterProps = {
  message: string;
  color?: string;
  onHide: () => void;
};

export default function Toast({
  message,
  color = Colors.purple.dark,
  onHide,
}: ToasterProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 45,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
          margin: 10,
          marginBottom: 5,
          backgroundColor: color,
          padding: 10,
          borderRadius: 4,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        <Text style={{ color: "white", fontSize: 14 }}>{message}</Text>
      </Animated.View>
    </View>
  );
}
