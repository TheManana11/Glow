import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BACKEND_URL } from '@env';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import Problem from '../../components/Problem/Problem';
import RoutineComponent from '../../components/RoutineComponent/RoutineComponent';

export default function SingleAnalysisScreen() {
  const route = useRoute();
  const { id } = route.params;
  const [analysis, setAnalysis] = useState({});

  const fetchAnalysis = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const response = await axios.get(`${BACKEND_URL}/analysis/${id}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setAnalysis(response.data.payload);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed!',
        text2: 'Failed to get analysis',
      });
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} color="#D89250" />
        <Text style={styles.headerTitle}>AI Skin Analysis Report</Text>
      </View>

      <View style={styles.analysisBox}>
        <View style={styles.analysisHeaderRow}>
          <Text style={styles.analysisTitle}>Single Analysis Report</Text>
        </View>
        <Text style={styles.analysisSubtitle}>
          Your comprehensive skin analysis with personalized recommendations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Skin Health Scores</Text>

        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Overall Score</Text>
            <Text style={styles.scoreValue}>{analysis?.scores?.general_skin_health_score}%</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Acne Score</Text>
            <Text style={styles.scoreValue}>{analysis?.scores?.acne_score}</Text>
          </View>
        </View>

        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Hydration</Text>
            <Text style={styles.scoreValue}>{analysis?.scores?.hydration_score}%</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Texture</Text>
            <Text style={styles.scoreValue}>{analysis?.scores?.texture_score}</Text>
          </View>
        </View>
      </View>

      <View style={styles.issuesSection}>
        <View style={styles.issuesHeader}>
          <Text style={styles.issuesTitle}>Detected Issues</Text>
          <Text style={styles.issuesCount}>
            {analysis?.problems?.length || 0} concerns found
          </Text>
        </View>

        {analysis?.problems?.map((issue, index) => (
          <Problem key={index} item={issue} />
        ))}
      </View>


      <Text style={styles.issuesTitle}>Personalized Plan</Text>
      <View style={styles.routineSection}>
        <View style={styles.routineHeader}>
          <Feather name="sun" size={18} color="#F7A53C" />
          <Text style={styles.routineTitle}>Morning Routine</Text>
        </View>
        <View style={styles.routineList}>
          {analysis?.skin_care_routine?.morning?.map((item, index) =>{ return <RoutineComponent key={index} step={item}/>})}
        </View>
      </View>
      
      <View style={styles.routineSection}>
        <View style={styles.routineHeader}>
          <Feather name="moon" size={18} color="#5A87FF" />
          <Text style={styles.routineTitle}>Evening Routine</Text>
        </View>
        <View style={styles.routineList}>
            {analysis?.skin_care_routine?.evening?.map((item, index) =>{ return <RoutineComponent key={index} step={item} />})}
        </View>
      </View>
    </ScrollView>
  );
}
