import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "components/Themed";
import { Colors } from "constants/Colors";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Spacings } from "constants/Layouts";
import { useSignOut, useUserData } from "@nhost/react";
import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_USER } from "graphql/queries";
import LoadingSpinner from "components/atoms/LoadingSpinner";

export default function ProfileScreen() {
  const user = useUserData();
  const { signOut } = useSignOut();
  const client = useApolloClient();

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: {
      id: user?.id || "",
    },
  });

  const confirmDeleteUser = async () => {
    try {
      const res = await deleteUser();
      if (res.data.deleteUser.id) {
        logout();
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error has occurred. Please try again or contact the support."
      );
    }
  };

  const deleteAccount = () => {
    Alert.alert(
      "Warning",
      "You are about to delete your account, this action is permanent you wont be able to retrieve your account and profile settings later. Are you sure you want to do this?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes, delete my account",
          style: "destructive",
          onPress: () => confirmDeleteUser(),
        },
      ]
    );
  };

  const logout = () => {
    signOut();
    client.resetStore();
    router.replace("/");
  };

  return (
    <LinearGradientBackground>
      {!user ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.container}>
          <View style={styles.userInfoSection}>
            <Text style={styles.username}>{user.displayName}</Text>
            <View style={styles.row}>
              <MaterialIcons name="email" size={20} color={Colors.text} />
              <Text style={styles.sectionText}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                <FontAwesome name="heart-o" size={24} color={Colors.text} />
                <Link href="/profile/favorites" style={styles.menuItemText}>
                  List of favorites
                </Link>
              </View>
              {/* Implement feature later */}
              {/* <View style={styles.menuItem}>
                <Ionicons name="earth" size={24} color={Colors.text} />
                <Link href="/profile/language" style={styles.menuItemText}>
                  Language
                </Link>
              </View> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                <FontAwesome name="book" size={24} color={Colors.text} />
                <Link href="/profile/source" style={styles.menuItemText}>
                  Source
                </Link>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                <FontAwesome name="lock" size={24} color={Colors.text} />
                <Link
                  href="/profile/change-password"
                  style={styles.menuItemText}
                >
                  Change password
                </Link>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                <Ionicons name="hammer" size={24} color={Colors.text} />
                <Link
                  href="/profile/privacy-policy"
                  style={styles.menuItemText}
                >
                  Privacy Policy
                </Link>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <View style={styles.menuItem}>
                <MaterialIcons name="logout" size={24} color={Colors.text} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.deleteWrapper}
              onPress={deleteAccount}
            >
              <Text style={styles.deleteText}>Delete your account</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  userInfoSection: {
    paddingHorizontal: Spacings.SM,
    paddingBottom: Spacings.M,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacings.XS,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacings.XS,
  },
  sectionText: {
    color: Colors.text,
    marginLeft: Spacings.XS,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: Spacings.S,
    paddingHorizontal: Spacings.SM,
  },
  menuItemText: {
    color: Colors.text,
    marginLeft: Spacings.SM,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  deleteWrapper: {
    marginTop: Spacings.M,
  },
  deleteText: {
    color: Colors.red,
    textAlign: "center",
    opacity: 0.8,
  },
});
