import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function InfoPage() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* App Info Section */}
        <Text style={styles.title}>Parenting made easy</Text>
        
        {/* Small Image Below Title */}
        <Image source={require("../assets/images/info.jpg")} style={styles.image} />
        
        <Text style={styles.subtitle}>Keep your child safe online</Text>
        <Text style={styles.description}>
          Ensure your kids have a safe online experience with <Text style={styles.bold}>SmartyPals</Text>. 
          This powerful tool offers peace of mind by enabling you to effortlessly track and control your 
          children’s activities across all their devices, no matter where they are.
        </Text>
        <Text style={styles.footerText}>Foster healthy digital habits</Text>

        <Image source={require("../assets/images/info1.jpg")} style={styles.image} />
        <Text style={styles.description}>
          Assist your child in cultivating a constructive relationship with technology. With <Text style={styles.bold}>SmartyPals</Text>,
          you can prioritize your children’s real-world pursuits while fostering harmonious digital habits as they mature.  
        </Text>

        {/* Features Button */}
        <TouchableOpacity style={styles.featuresButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.featuresButtonText}>☰</Text>
        </TouchableOpacity>
        {/* Profile Button */}
<TouchableOpacity
  style={styles.profileButton}
  onPress={() => router.push("/parent-profile")}
>
  <Text style={styles.profileButtonText}>👤 Profile</Text>
</TouchableOpacity>


        {/* Features Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>App Features</Text>
            
              <TouchableOpacity onPress={() => router.push("/apps-website-blocking")}> 
  <Text style={styles.modalItem}>✅ Apps & Website Blocking</Text>
</TouchableOpacity>

              <Text style={styles.modalItem}>✅ Location Tracking</Text>
              <TouchableOpacity onPress={() => router.push("./daily-usage")}>
              <Text style={styles.modalItem}>✅ Daily Usage Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/screen-time")}>
                <Text style={styles.modalItem}>✅ Screen Time Management</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 }, // Ensures content is scrollable
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  image: { width: 250, height: 200, marginVertical: 10, resizeMode: "contain" },
  subtitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 5 },
  description: { fontSize: 18, textAlign: "center", color: "gray", marginBottom: 10 },
  bold: { fontWeight: "bold" },
  footerText: { fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 20 },

  featuresButton: { position: "absolute", top: 40, left: 20, padding: 10, backgroundColor: "#000", borderRadius: 5 },
  featuresButtonText: { color: "#fff", fontSize: 18 },

  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  modalItem: { fontSize: 16, marginVertical: 5 },
  closeButton: { marginTop: 15, padding: 10, backgroundColor: "blue", borderRadius: 5 },
  closeButtonText: { color: "white", fontWeight: "bold" },
  profileButton: {
    position: "absolute",
    top: 100, // below the ☰ button
    left: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  profileButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});

