import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import styles from "./style";
import { useSelector } from "react-redux";
import { selectAnalysis } from "../../redux/slices/analysis";


const HistoryScreen = () => {
  const analysis = useSelector(selectAnalysis);

  if (!analysis || analysis.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyTitle}>No History Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start your first analysis to see all your history and track your skin health journey.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AnalysisMain')}
          style={styles.emptyButton}
        >
          <Text style={styles.emptyButtonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formattedDate = (date) => {
   return new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})};
  return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {analysis.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.headerRow}>
              <View style={styles.dateRow}>
                <Feather name="calendar" size={18} color="#D4A373" />
                <Text style={styles.dateText}>{formattedDate(item.created_at)}</Text>
              </View>
              <View style={item.scores.general_skin_health_score >= 80 ? styles.scoreBadge : styles.warningBadge}>
                <Text style={item.scores.general_skin_health_score >= 80 ? styles.scoreText : styles.warning}>{item.scores.general_skin_health_score / 10}/10</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={18}
                  color="#4CAF50"
                />
                <Text style={styles.improvementTitle}>Goals to Improve</Text>
              </View>
              {item.goals.map((point, i) => (
                <View style={styles.bulletRow} key={i}>
                  <View style={styles.greenDot} />
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Feather name="alert-circle" size={18} color="#F4A300" />
                <Text style={styles.focusTitle}>Area to Focus</Text>
              </View>
              {item.problems.map((point, i) => (
                <View style={styles.bulletRow} key={i}>
                  <View style={styles.yellowDot} />
                  <Text style={styles.bulletText}>{point.title}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
  );
};

export default HistoryScreen;