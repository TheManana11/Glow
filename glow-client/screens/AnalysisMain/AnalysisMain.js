import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AnalysisScreen from '../Analysis/AnalysisScreen';
import ProblemsScreen from '../Problems/ProblemsScreen';
import RoutineScreen from '../Routine/RoutineScreen';
import styles from './style';
import Footer from '../../components/Footer/Footer';

const AnalysisMain = () => {
  const [activeTab, setActiveTab] = useState("Analysis");
  const [canGoToScreens, setCanGoToScreens] = useState(false);
  const [analysis, setAnalysis] = useState({});

  const renderContent = () => {
    if (activeTab === "Analysis") return <AnalysisScreen setAnalysis={setAnalysis} setActiveTab={setActiveTab} setCanGoToScreens={setCanGoToScreens} />;
    if (activeTab === "Problems") return <ProblemsScreen setActiveTab={setActiveTab} analysis={analysis} />;
    return <RoutineScreen analysis={analysis}/>;
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>AI Skin Analysis</Text>
      <Text style={styles.subtitle}>
        Upload a clear photo of your skin for instant AI-powered analysis and personalized recommendations.
      </Text>

      <View style={styles.buttonContainer}>
        
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

        <View style={styles.buttonWithLabel}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === "Problems" && styles.activeButton]}
            onPress={() => setActiveTab("Problems")}
            disabled={!canGoToScreens}
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

        <View style={styles.buttonWithLabel}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === "Routine" && styles.activeButton]}
            onPress={() => setActiveTab("Routine")}
            disabled={!canGoToScreens}
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

      <ScrollView style={styles.subRouteContainer}>
        {renderContent()}
      </ScrollView>
    </View>
      <Footer />
      </>
  );
};

export default AnalysisMain;
