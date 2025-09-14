import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import OverviewScreen from '../../screens/Overview/OverviewScreen'
import HistoryScreen from '../../screens/History/HistoryScreen'
import styles from "./style";
import { Feather } from "@expo/vector-icons";
import Footer from "../../components/Footer/Footer";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    if (activeTab === "Overview") {
      return <OverviewScreen />;
    }
    return <HistoryScreen />;
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Skin Health Journey</Text>
        <Text style={styles.subtitle}>
          Track your progress over time and see how your skin improves with consistent care
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === "Overview" && styles.activeButton]}
          onPress={() => setActiveTab("Overview")}
        >
          <Feather style={[
              styles.buttonText,
              activeTab === "Overview" && styles.activeButtonText,
            ]} name="bar-chart" size={16} />
          <Text
            style={[
              styles.buttonText,
              activeTab === "Overview" && styles.activeButtonText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeTab === "History" && styles.activeButton]}
          onPress={() => setActiveTab("History")}
        >
          <Feather style={[
              styles.buttonText,
              activeTab === "History" && styles.activeButtonText,
            ]} name="clock" size={16} />
          <Text
            style={[
              styles.buttonText,
              activeTab === "History" && styles.activeButtonText,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>
    </View>
    <Footer />
    </>
  );
};

export default MainScreen;