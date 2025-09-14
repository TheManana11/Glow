import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function ProblemsScreen({ setActiveTab }) {

  const navigaetion = useNavigation();
  const problems = [
    {
      id: 1,
      severity: 'Moderate',
      confidence: '92% confident',
      title: 'Acne and Blackheads',
      description: 'Visible comedowns and inflammatory lesions detected',
      color: '#FCEEE9', // light background
      textColor: '#E55D2E', // severity color
      iconColor: '#E55D2E',
    },
    {
      id: 2,
      severity: 'Mild',
      confidence: '88% confident',
      title: 'Dark Circles',
      description: 'Under-eye hyper-pigmentation with mild puffiness',
      color: '#FEF8E7',
      textColor: '#E5A029',
      iconColor: '#E5A029',
    },
    {
      id: 3,
      severity: 'Severe',
      confidence: '95% confident',
      title: 'Dehydration',
      description: 'Visible comedowns and inflammatory lesions detected',
      color: '#FDECEC',
      textColor: '#D92D20',
      iconColor: '#D92D20',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Analysis complete!</Text>
        <Text style={styles.percentage}>100%</Text>
      </View>

      {/* Detected Issues Section */}
      <View style={styles.detectedHeader}>
        <Text style={styles.detectedTitle}>Detected Issues</Text>
        <Text style={styles.detectedSubtitle}>4 concerns found</Text>
      </View>

      {/* Problem Cards */}
      {problems.map((item) => (
        <View key={item.id} style={[styles.problemCard, { backgroundColor: item.color }]}>
          <View style={styles.problemHeader}>
            <View style={styles.severityContainer}>
              <Feather name="alert-triangle" size={16} color={item.iconColor} />
              <Text style={[styles.severityText, { color: item.textColor }]}>{item.severity}</Text>
            </View>
            <Text style={[styles.confidenceText, { color: item.textColor }]}>
              {item.confidence}
            </Text>
          </View>

          <Text style={styles.problemTitle}>{item.title}</Text>
          <Text style={styles.problemDescription}>{item.description}</Text>
        </View>
      ))}

      {/* CTA Button */}
      <TouchableOpacity onPress={() => setActiveTab('Routine')} style={styles.button}>
        <Text style={styles.buttonText}>View Personalized Recommendation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
