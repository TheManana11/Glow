import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AnalysisScreen from '../Analysis/AnalysisScreen';
import ProblemsScreen from '../Problems/ProblemsScreen';
import RoutineScreen from '../Routine/RoutineScreen';
import styles from './style';

const AnalysisMain = () => {
  const [activeTab, setActiveTab] = useState("Analysis"); // Default to Analysis screen

  // Dynamically render the selected screen
  const renderContent = () => {
    if (activeTab === "Analysis") return <AnalysisScreen />;
    if (activeTab === "Problems") return <ProblemsScreen />;
    return <RoutineScreen />;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>AI Skin Analysis</Text>
      <Text style={styles.subtitle}>
        Upload a clear photo of your skin for instant AI-powered analysis and personalized recommendations.
      </Text>

      {/* BUTTONS WITH LABELS */}
      <View style={styles.buttonContainer}>
        
        {/* Button 1 - Analysis */}
        <View style={styles.buttonWithLabel}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === "Analysis" && styles.activeButton]}
            onPress={() => setActiveTab("Analysis")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.stepLabel,
              activeTab === "Analysis" && styles.activeStepLabel,
            ]}
          >
            Upload Image
          </Text>
        </View>

        {/* Button 2 - Problems */}
        <View style={styles.buttonWithLabel}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === "Problems" && styles.activeButton]}
            onPress={() => setActiveTab("Problems")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.stepLabel,
              activeTab === "Problems" && styles.activeStepLabel,
            ]}
          >
            AI Analysis
          </Text>
        </View>

        {/* Button 3 - Routine */}
        <View style={styles.buttonWithLabel}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === "Routine" && styles.activeButton]}
            onPress={() => setActiveTab("Routine")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.stepLabel,
              activeTab === "Routine" && styles.activeStepLabel,
            ]}
          >
            Results
          </Text>
        </View>
      </View>

      {/* CONTENT AREA */}
      <ScrollView style={styles.subRouteContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default AnalysisMain;
