import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';

export default function RoutineComponent({ step }) {
  
  return(
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepNumber}>{step?.step}</Text>
        <View style={styles.stepInfo}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepTitle}>{step?.product_name}</Text>
          </View>
          <Text style={styles.stepRealName}>{step?.product_real_name}</Text>
          <Text style={styles.stepDescription}>{step?.how_to_use}</Text>
          <View style={styles.stepTimeRow}>
            <Feather name="clock" size={14} color="#808080" />
            <Text style={styles.stepTime}>{step?.time - 1}-{step?.time} minutes</Text>
          </View>
        </View>
      </View>
    </View>
  );
}