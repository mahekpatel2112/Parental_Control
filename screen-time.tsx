import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";

export default function ScreenTimeManagement() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Wed");
  const [screenTime, setScreenTime] = useState(3); // Default 3 hours
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set screen time limits</Text>
      
      <View style={styles.daySelector}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day ? styles.selectedDay : null,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.subtitle}>Daily time limits</Text>
      <Text style={styles.description}>
        Set a screen time allowance for each day of the week.
      </Text>
      
      <View style={styles.circleContainer}>
        <Text style={styles.timeText}>{screenTime}:00</Text>
        <Text style={styles.timeSubText}>hours min</Text>
        <Text style={styles.dayLabel}>{selectedDay}</Text>
      </View>
      
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={screenTime}
        onValueChange={(value) => setScreenTime(value)}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="#ddd"
        thumbTintColor="blue"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={() => setScreenTime(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blockButton}>
          <Text style={styles.buttonText}>Block</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E0F7E9", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  daySelector: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  dayButton: { padding: 7, margin: 5, borderRadius: 20, backgroundColor: "#fff" },
  selectedDay: { backgroundColor: "blue" },
  dayText: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 5 },
  description: { fontSize: 14, textAlign: "center", color: "gray", marginBottom: 10 },
  circleContainer: { justifyContent: "center", alignItems: "center", width: 200, height: 200, borderRadius: 100, backgroundColor: "#fff", marginVertical: 20 },
  timeText: { fontSize: 32, fontWeight: "bold" },
  timeSubText: { fontSize: 14, color: "gray" },
  dayLabel: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  slider: { width: "80%", height: 40, marginVertical: 10 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "60%" },
  resetButton: { backgroundColor: "gray", padding: 10, borderRadius: 5, alignItems: "center" },
  blockButton: { backgroundColor: "red", padding: 10, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});
