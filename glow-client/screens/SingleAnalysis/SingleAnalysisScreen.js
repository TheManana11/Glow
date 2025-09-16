import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BACKEND_URL } from '@env';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message';

export default function SingleAnalysisScreen() {

  const route = useRoute();
  const { id } = route.params;
  const [analysis, setAnalysis] = useState({});

  const fetchAnalysis = async () => {
   try {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.get(`${BACKEND_URL}/analysis/${id}`, {headers:{
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }});
    setAnalysis(response.data.payload);
   } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed!',
      text2: 'Failed to get analysis'
    });
   }
  }

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.subtitle}>This is a simple screen with only text.</Text>
      <Text style={styles.subtitle}>{ analysis.id }</Text>
      <Text style={styles.subtitle}>{ analysis.problems?.[0].title }</Text>
      <Text style={styles.subtitle}>{ analysis.problems?.[1].title }</Text>
      <Text style={styles.subtitle}>{ analysis.problems?.[2].title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    backgroundColor: '#f8f8f8', // Light background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
