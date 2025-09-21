import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import Problem from '../../components/Problem/Problem';


export default function ProblemsScreen({ setActiveTab, analysis }) {

  const problems = analysis.problems;
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Analysis complete!</Text>
        <Text style={styles.percentage}>100%</Text>
      </View>

      <View style={styles.detectedHeader}>
        <Text style={styles.detectedTitle}>Detected Issues</Text>
        <Text style={styles.detectedSubtitle}>{problems.length} concerns found</Text>
      </View>

      {problems.map((item, key) => {
        return (
          <Problem key={key} item={item} />
        );
      })}

      <TouchableOpacity onPress={() => setActiveTab('Routine')} style={styles.button}>
        <Text style={styles.buttonText}>View Personalized Recommendation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
