import { View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import styles from "./style";
import Footer from '../../components/Footer/Footer'

const historyData = [
  {
    date: "August 30, 2025",
    score: 8.3,
    improvements: [
      "Significant reduction in acne breakouts",
      "Improved skin hydration levels",
      "More even skin texture",
    ],
    focus: [
      "Slight darkening around eyes",
      "Monitor vitamin C serum application",
    ],
  },
  {
    date: "August 23, 2025",
    score: 7.2,
    improvements: [
      "Significant reduction in acne breakouts",
      "Improved skin hydration levels",
      "More even skin texture",
    ],
    focus: [
      "Slight darkening around eyes",
      "Monitor vitamin C serum application",
    ],
  },
  {
    date: "August 20, 2025",
    score: 6.8,
    improvements: [
      "Significant reduction in acne breakouts",
      "Improved skin hydration levels",
      "More even skin texture",
    ],
    focus: [
      "Slight darkening around eyes",
      "Monitor vitamin C serum application",
    ],
  },
];

const HistoryScreen = () => {
  return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {historyData.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* Date and Score */}
            <View style={styles.headerRow}>
              <View style={styles.dateRow}>
                <Feather name="calendar" size={18} color="#D4A373" />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={item.score >= 8 ? styles.scoreBadge : styles.warningBadge}>
                <Text style={item.score >= 8 ? styles.scoreText : styles.warning}>{item.score}/10</Text>
              </View>
            </View>

            {/* Improvements */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={18}
                  color="#4CAF50"
                />
                <Text style={styles.improvementTitle}>Improvements</Text>
              </View>
              {item.improvements.map((point, i) => (
                <View style={styles.bulletRow} key={i}>
                  <View style={styles.greenDot} />
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>

            {/* Area to Focus */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Feather name="alert-circle" size={18} color="#F4A300" />
                <Text style={styles.focusTitle}>Area to Focus</Text>
              </View>
              {item.focus.map((point, i) => (
                <View style={styles.bulletRow} key={i}>
                  <View style={styles.yellowDot} />
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
  );
};

export default HistoryScreen;