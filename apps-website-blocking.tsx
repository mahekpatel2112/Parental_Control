import React, { useState } from "react";
import { View, Text, Switch, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const appData = [
  { id: "1", name: "YouTube", icon: require("../assets/images/youtube.jpg"), blocked: false },
  { id: "2", name: "Netflix", icon: require("../assets/images/netflix.jpg"), blocked: false },
  { id: "3", name: "Disney+", icon: require("../assets/images/disney.jpg"), blocked: false },
  { id: "4", name: "TikTok", icon: require("../assets/images/tiktok.jpg"), blocked: true },
  { id: "5", name: "Minecraft", icon: require("../assets/images/minecraft.jpg"), blocked: false },
  { id: "6", name: "Pinterest", icon: require("../assets/images/pinterest.jpg"), blocked: false },
  { id: "7", name: "Instagram", icon: require("../assets/images/instagram.jpg"), blocked: false },
];

export default function AppsWebsiteBlocking() {
  const router = useRouter();
  const [apps, setApps] = useState(appData);
  const [rulesEnabled, setRulesEnabled] = useState(true);

  const toggleBlock = (appId: string) => {
    console.log("Toggling block for app with ID:", appId); // Debug log
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === appId ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Block or limit games & apps</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.subtitle}>Enable games & apps rules</Text>
        <Switch value={rulesEnabled} onValueChange={setRulesEnabled} />
      </View>
      <FlatList
        data={apps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appItem}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.appName}>{item.name}</Text>
            <TouchableOpacity style={styles.blockButton} onPress={() => toggleBlock(item.id)}>
              <MaterialIcons
                name={item.blocked ? "block" : "check-circle"}
                size={24}
                color={item.blocked ? "red" : "green"}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DFF6E3", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  switchContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  subtitle: { fontSize: 16, color: "gray" },
  appItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  icon: { width: 40, height: 40, marginRight: 10 },
  appName: { flex: 1, fontSize: 16, fontWeight: "bold" },
  blockButton: { padding: 10 },
});
