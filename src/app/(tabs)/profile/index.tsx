import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "components/Themed";
import Colors from "constants/Colors";
import LinearGradientBackground from "components/atoms/LinearGradientBackground";
import { Spacings } from "constants/Layouts";

export default function ProfileScreen() {
  return (
    <LinearGradientBackground>
      <SafeAreaView>
        <View style={styles.userInfoSection}>
          <Text style={styles.username}>Username here</Text>
          <View style={styles.row}>
            <MaterialIcons name="email" size={20} color={Colors.light.text} />
            <Text style={styles.sectionText}>User email here</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: Colors.light.text,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={styles.infoBoxText}>0</Text>
            <Text style={styles.infoBoxText}>Name favorites</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>0</Text>
            <Text style={styles.infoBoxText}>Date favorites</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <FontAwesome name="heart-o" size={24} color={Colors.light.text} />
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <MaterialIcons
                name="policy"
                size={24}
                color={Colors.light.text}
              />
              <Link href="/profile/privacy-policy" style={styles.menuItemText}>
                Privacy Policy
              </Link>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <FontAwesome name="legal" size={24} color={Colors.light.text} />

              <Text style={styles.menuItemText}>Legal Information</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <MaterialIcons
                name="logout"
                size={24}
                color={Colors.light.text}
              />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.deleteWrapper} onPress={() => {}}>
            <Text style={styles.deleteText}>Delete your account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: Spacings.SM,
    paddingBottom: Spacings.M,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacings.XS,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacings.XS,
  },
  sectionText: {
    color: Colors.light.text,
    marginLeft: Spacings.XS,
  },
  infoBoxWrapper: {
    borderBottomColor: Colors.light.text,
    borderBottomWidth: 1,
    borderTopColor: Colors.light.text,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxText: {
    color: Colors.light.text,
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
    color: Colors.light.text,
    marginLeft: Spacings.SM,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  deleteWrapper: {
    marginTop: Spacings.M,
  },
  deleteText: {
    color: Colors.light.delete,
    textAlign: "center",
    opacity: 0.8,
  },
});
