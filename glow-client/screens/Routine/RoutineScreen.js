import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';

export default function RoutineScreen() {
  // Sample data for morning and evening routines
  const morningRoutine = [
    {
      id: 1,
      title: 'Gentle Cleanser',
      description: 'CeraVe Foaming Facial Cleanser\nRemove impurities without stripping natural oil',
      time: '1-2 minutes',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Toner',
      description: "Paula's Choice 2% BHA Liquid\nExfoliate pores and reduce blackheads",
      time: '30 seconds',
      rating: 4.7,
    },
    {
      id: 3,
      title: 'Hydrating Serum',
      description: "The Ordinary Hyaluronic Acid 2%\nBoost hydration and plump fine lines",
      time: '1 minute',
      rating: 4.6,
    },
    {
      id: 4,
      title: 'Moisturizer',
      description: 'Neutrogena Hydro Boost\nLock in moisture for all-day hydration',
      time: '1 minute',
      rating: 4.5,
    },
    {
      id: 5,
      title: 'Sun Screen',
      description: 'EltaMD UV Clear SPF 46\nProtect from UV damage and prevent dark spots',
      time: '1 minute',
      rating: 4.9,
    },
  ];

  const eveningRoutine = [
    {
      id: 1,
      title: 'Gentle Cleanser',
      description: 'CeraVe Foaming Facial Cleanser\nRemove impurities without stripping natural oil',
      time: '1-2 minutes',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Toner',
      description: "Paula's Choice 2% BHA Liquid\nExfoliate pores and reduce blackheads",
      time: '30 seconds',
      rating: 4.7,
    },
    {
      id: 3,
      title: 'Hydrating Serum',
      description: "The Ordinary Hyaluronic Acid 2%\nBoost hydration and plump fine lines",
      time: '1 minute',
      rating: 4.6,
    },
    {
      id: 4,
      title: 'Sun Screen',
      description: 'EltaMD UV Clear SPF 46\nProtect from UV damage and prevent dark spots',
      time: '1 minute',
      rating: 4.9,
    },
  ];

  const renderStep = (step, index) => (
    <View key={step.id} style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepNumber}>{index + 1}</Text>
        <View style={styles.stepInfo}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepRating}>{step.rating}</Text>
          </View>
          <Text style={styles.stepDescription}>{step.description}</Text>
          <View style={styles.stepTimeRow}>
            <Feather name="clock" size={14} color="#808080" />
            <Text style={styles.stepTime}>{step.time}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Personalized Plan Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Personalized Plan</Text>
        <Text style={styles.headerSubtitle}>
          Complete skin care routine tailored to your skin concern
        </Text>
      </View>

      {/* Skin Care Goals */}
      <View style={styles.goalsBox}>
        <Text style={styles.goalsTextTitle}> Your Skin Care Goals</Text>
        <Text style={styles.goalsText}>✓ Reduce acne and blackheads</Text>
        <Text style={styles.goalsText}>✓ Minimize pore appearance</Text>
        <Text style={styles.goalsText}>✓ Improve skin hydration</Text>
        <Text style={styles.goalsText}>✓ Brighten under eye area</Text>
        <Text style={styles.goalsNote}>
          Expected results in 4-6 weeks with consistent use
        </Text>
      </View>

      {/* Morning Routine */}
      <View style={styles.routineSection}>
        <View style={styles.routineHeader}>
          <Feather name="sun" size={18} color="#F7A53C" />
          <Text style={styles.routineTitle}>Morning Routine</Text>
        </View>
        <View style={styles.routineList}>
          {morningRoutine.map((item, index) => renderStep(item, index))}
        </View>
      </View>

      {/* Evening Routine */}
      <View style={styles.routineSection}>
        <View style={styles.routineHeader}>
          <Feather name="moon" size={18} color="#5A87FF" />
          <Text style={styles.routineTitle}>Evening Routine</Text>
        </View>
        <View style={styles.routineList}>
          {eveningRoutine.map((item, index) => renderStep(item, index))}
        </View>
      </View>

      {/* Pro Tips Section */}
      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>Pro Tips for Success</Text>
        <Text style={styles.tip}>• Start slowly and introduce new products 1 at a time</Text>
        <Text style={styles.tip}>• Be consistent, results need 4-6 weeks to show</Text>
        <Text style={styles.tip}>• Take progress photos weekly to track improvement</Text>
      </View>
    </ScrollView>
  );
}
