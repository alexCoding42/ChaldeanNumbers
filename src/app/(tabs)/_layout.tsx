import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#151146",
          elevation: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Date",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="name"
        options={{
          title: "Name",
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
        }}
      />
      <Tabs.Screen
        name="number-list/index"
        options={{
          headerShown: true,
          headerBackground: () => (
            <LinearGradient
              colors={Colors.light.background}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          ),
          headerTitleStyle: {
            color: Colors.light.text,
          },
          headerTintColor: Colors.light.text,
          headerTitle: "List of chaldean numbers",
          title: "List",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ol" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
