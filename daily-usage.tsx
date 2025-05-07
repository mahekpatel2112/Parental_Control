import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

// Sample usage data (replace with real data from backend later)
const sampleData = {
  totalUsage: "3h 45m",
  limit: "4h",
  dailyUsage: [2, 3.5, 4, 3, 2.8, 3.2, 3.7], // Usage in hours for past 7 days
  topApps: [
    { id: "1", name: "YouTube", time: "1h 20m" },
    { id: "2", name: "WhatsApp", time: "50m" },
    { id: "3", name: "Instagram", time: "40m" },
    { id: "4", name: "Netflix", time: "35m" },
  ],
};

export default function DailyUsageReport() {
  const [usageData, setUsageData] = useState(sampleData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Usage Report</Text>

      {/* Usage Summary */}
      <View style={styles.usageSummary}>
        <Text style={styles.summaryText}>Total Usage: {usageData.totalUsage}</Text>
        <Text style={styles.summaryText}>Limit: {usageData.limit}</Text>
      </View>

      {/* Screen Time Trend Graph */}
      <Text style={styles.chartTitle}>Screen Time (Last 7 Days)</Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: usageData.dailyUsage }],
        }}
        width={screenWidth - 40}
        height={200}
        yAxisSuffix="h"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      {/* Top Used Apps */}
      <Text style={styles.sectionTitle}>Most Used Apps</Text>
      <FlatList
        data={usageData.topApps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appItem}>
            <Text style={styles.appName}>{item.name}</Text>
            <Text style={styles.appTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  usageSummary: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryText: { fontSize: 16, fontWeight: "bold" },
  chartTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  chart: { marginVertical: 10, borderRadius: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  appItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#fff", borderRadius: 8, marginVertical: 5 },
  appName: { fontSize: 16 },
  appTime: { fontSize: 16, fontWeight: "bold" },
});
