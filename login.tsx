import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

// ✅ Use your backend IP directly (ensure it's accessible from your phone)
const BASE_URL = "http://10.25.0.39:8000"; // Replace with your backend IP

export default function LoginScreen() {
  const router = useRouter();
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_name: parentName, email }),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        if (response.ok) {
         // In login.tsx, inside handleLogin (after successful login)
if (response.ok) {
  Alert.alert("Login Success", result.message);
  router.push({
    pathname: "/parent-profile",
    params: { parentName, email },
  });
          router.push("/child-details");
}
        } else {
          Alert.alert("Login Failed", result.message || "Invalid login credentials.");
        }
      } else {
        const text = await response.text();
        throw new Error(`Invalid response from server: ${text}`);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message || "Please check your connection and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Sign in to continue.</Text>

      <Text style={styles.label}>Parent Name</Text>
      <TextInput
        style={styles.input}
        value={parentName}
        onChangeText={setParentName}
        placeholder="Enter Parent Name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.signupLink}>New user? Create an account</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/images/login.jpg")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#f0f0f0",
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  signupLink: {
    color: "blue",
    marginTop: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: 20,
    resizeMode: "contain",
  },
});
