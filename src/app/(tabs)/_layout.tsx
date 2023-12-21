import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerBackground: () => (
          <LinearGradient
            colors={Colors.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        ),
        headerTitleStyle: {
          color: Colors.text,
        },
        headerTintColor: Colors.text,
        tabBarActiveTintColor: Colors.tabIconSelected,

        tabBarStyle: {
          backgroundColor: Colors.purple.dark,
          elevation: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Calculate a name",
          title: "Name",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-letter-case"
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="date"
        options={{
          headerTitle: "Calculate a date",
          title: "Date",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="numbers"
        options={{
          headerShown: false,
          title: "Numbers",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ol" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
