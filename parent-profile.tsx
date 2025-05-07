import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ParentProfile() {
  const router = useRouter();
  const { parentName, email } = useLocalSearchParams(); // 🟢 get dynamic data

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This will allow profile editing soon.");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "You have been logged out.");
    router.push("/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>👤 Parent Profile</Text>

      <View style={styles.profileCard}>
        <Image
          source={require("../assets/images/login.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>{parentName}</Text>
        <Text style={styles.profileEmail}>{email}</Text>

        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <Text style={styles.editText}>✏️ Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navSection}>
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/child-details")}
        >
          <Text style={styles.navText}>👧 Manage Child Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/screen-time")}
        >
          <Text style={styles.navText}>⏰ Screen Time Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/daily-usage")}
        >
          <Text style={styles.navText}>📊 Daily Usage Reports</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fefefe",
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34495e",
  },
  profileEmail: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  editBtn: {
    backgroundColor: "#3498db",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  editText: {
    color: "white",
    fontWeight: "bold",
  },
  navSection: {
    width: "100%",
  },
  navCard: {
    backgroundColor: "#ecf0f1",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  navText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 5,
    width: "100%",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
