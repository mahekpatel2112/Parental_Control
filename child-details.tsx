import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ChildDetailsScreen() {
  const router = useRouter();
  const [children, setChildren] = useState<{ id: number; name: string; age: string; phone: string; device: string }[]>([]);

  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const BASE_URL = "http://10.25.0.39:8000"; 

  const addChild = () => {
    if (childName.trim() && childAge.trim() && phoneNumber.trim() && deviceType.trim()) {
      setChildren((prevChildren) => [
        ...prevChildren,
        {
          id: prevChildren.length + 1,
          name: childName,
          age: childAge,
          phone: phoneNumber,
          device: deviceType,
        },
      ]);
      setChildName("");
      setChildAge("");
      setPhoneNumber("");
      setDeviceType("");
    } else {
      alert("Please fill all fields before adding a child.");
    }
  };

  const saveChildrenToBackend = async () => {
    if (children.length === 0) {
      alert("Please add at least one child.");
      return;
    }

    try {
      for (const child of children) {
        const response = await fetch(`${BASE_URL}/add-child`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: child.name,
            age: child.age,
            phone: child.phone,
            device_type: child.device,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(`Error saving child: ${child.name} - ${data.message}`);
          return;
        }
      }

      alert("Children saved successfully!");
      router.push("/info");

    } catch (error) {
      console.error("Backend error:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Child Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Child's Name"
        value={childName}
        onChangeText={setChildName}
      />

      <TextInput
        style={styles.input}
        placeholder="Child's Age"
        value={childAge}
        onChangeText={setChildAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Device Type (Android/iOS)"
        value={deviceType}
        onChangeText={setDeviceType}
      />

      <TouchableOpacity style={styles.button} onPress={addChild}>
        <Text style={styles.buttonText}>Add Another Child</Text>
      </TouchableOpacity>

      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.childCard}>
            <Text style={styles.childText}>{item.name}, {item.age} years</Text>
            <Text style={styles.childText}>Phone: {item.phone}</Text>
            <Text style={styles.childText}>Device: {item.device}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={saveChildrenToBackend}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginTop: 10, backgroundColor: "#f0f0f0" },
  button: { backgroundColor: "blue", padding: 12, borderRadius: 5, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  childCard: { padding: 10, marginVertical: 5, backgroundColor: "#e0e0e0", borderRadius: 5 },
  childText: { fontSize: 16 },
});
