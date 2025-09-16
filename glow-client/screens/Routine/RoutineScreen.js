import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';

export default function RoutineScreen({ analysis }) {

  const goals = analysis.goals;
  const morningRoutine = analysis.skin_care_routine.morning;
  const eveningRoutine = analysis.skin_care_routine.evening;
  
  const renderStep = (step, index) => (
    <View key={index} style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepNumber}>{step.step}</Text>
        <View style={styles.stepInfo}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>{step.product_name}</Text>
          </View>
          <Text style={styles.stepRealName}>{step.product_real_name}</Text>
          <Text style={styles.stepDescription}>{step.how_to_use}</Text>
          <View style={styles.stepTimeRow}>
            <Feather name="clock" size={14} color="#808080" />
            <Text style={styles.stepTime}>{step.time - 1}-{step.time} minutes</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Personalized Plan</Text>
        <Text style={styles.headerSubtitle}>
          Complete skin care routine tailored to your skin concern
        </Text>
      </View>

      <View style={styles.goalsBox}>
        <Text style={styles.goalsTextTitle}> Your Skin Care Goals</Text>
        {
          goals.map((goal, index) => {
            return <Text key={index} style={styles.goalsText}>✓ {goal}</Text>
          })
        }
        {/* <Text style={styles.goalsText}>✓ Reduce acne and blackheads</Text>
        <Text style={styles.goalsText}>✓ Minimize pore appearance</Text>
        <Text style={styles.goalsText}>✓ Improve skin hydration</Text>
        <Text style={styles.goalsText}>✓ Brighten under eye area</Text> */}
        <Text style={styles.goalsNote}>
          Expected results in 4-6 weeks with consistent use
        </Text>
      </View>

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

      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>Pro Tips for Success</Text>
        <Text style={styles.tip}>• Start slowly and introduce new products 1 at a time</Text>
        <Text style={styles.tip}>• Be consistent, results need 4-6 weeks to show</Text>
        <Text style={styles.tip}>• Take progress photos weekly to track improvement</Text>
      </View>
    </ScrollView>
  );
}
