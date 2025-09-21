import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import DoctorFooter from '../../components/DoctorFooter/DoctorFooter'

const ChatsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chatList}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No chats yet</Text>
          <Text style={styles.emptySubText}>
            Start a conversation and your chats will appear here.
          </Text>
        </View>
      </ScrollView>
      <DoctorFooter />
    </View>
  );
};

export default ChatsScreen;
