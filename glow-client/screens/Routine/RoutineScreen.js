import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import RoutineComponent from '../../components/RoutineComponent/RoutineComponent';

export default function RoutineScreen({ analysis }) {

  const goals = analysis.goals;
  const morningRoutine = analysis.skin_care_routine.morning;
  const eveningRoutine = analysis.skin_care_routine.evening;

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
          {morningRoutine.map((item, index) =>{ return <RoutineComponent key={index} step={item}/>})}
        </View>
      </View>

      <View style={styles.routineSection}>
        <View style={styles.routineHeader}>
          <Feather name="moon" size={18} color="#5A87FF" />
          <Text style={styles.routineTitle}>Evening Routine</Text>
        </View>
        <View style={styles.routineList}>
           {eveningRoutine.map((item, index) =>{ return <RoutineComponent key={index} step={item} />})}
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
