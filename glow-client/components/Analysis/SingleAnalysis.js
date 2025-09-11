import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';

const SingleAnalysis = ({ title, dateCreated, score }) => {
  const getTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = now - created;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  const getStatus = (score) => {
    if (score > 80) return { label: 'Good', color: styles.goodStatus };
    if (score >= 60) return { label: 'Moderate', color: styles.moderateStatus };
    return { label: 'Poor', color: styles.poorStatus };
  };

  const status = getStatus(score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.bottomRow}>
        <View style={styles.timeContainer}>
          <Feather name="clock" size={14} color="#7e7e7e" />
          <Text style={styles.timeText}>{getTimeAgo(dateCreated)}</Text>
        </View>

        <View style={[styles.statusBadge, status.color]}>
          <Text style={styles.statusText}>{status.label}</Text>
        </View>
      </View>
    </View>
  );
};

export default SingleAnalysis;
