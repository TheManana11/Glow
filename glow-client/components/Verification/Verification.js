import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';

export default function VerificationScreen() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Feather name="alert-circle" style={styles.icon} />

          <Text style={styles.title}>Verification Process</Text>

          <Text style={styles.description}>
            Document verification typically takes 0-24 hours.{"\n"}
            You'll receive an email notification once your{"\n"}
            documents are approved.
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
