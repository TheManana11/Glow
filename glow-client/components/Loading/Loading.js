import { View, Text, ActivityIndicator, Modal } from 'react-native';
import styles from './style'

export default function LoadingOverlay({ visible }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#D89250" />
          <Text style={styles.text}>Analyzing...</Text>
        </View>
      </View>
    </Modal>
  );
}

