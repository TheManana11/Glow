import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';


export default function ProblemsScreen({ setActiveTab, analysis }) {

  const problems = analysis.problems;
 
  const getSeverityStyles = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return {
          cardStyle: styles.mildBackground,
          textColor: styles.mildText,
          iconColor: '#E5A029',
        };
      case 'moderate':
        return {
          cardStyle: styles.moderateBackground,
          textColor: styles.moderateText,
          iconColor: '#E55D2E',
        };
      case 'severe':
        return {
          cardStyle: styles.severeBackground,
          textColor: styles.severeText,
          iconColor: '#D92D20',
        };
      default:
        return {
          cardStyle: styles.defaultBackground,
          textColor: styles.defaultText,
          iconColor: '#808080',
        };
    }
  };

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
        const severityStyles = getSeverityStyles(item.severity);
        return (
          <View key={key} style={[styles.problemCard, severityStyles.cardStyle]}>
            <View style={styles.problemHeader}>
              <View style={styles.severityContainer}>
                <Feather name="alert-triangle" size={16} color={severityStyles.iconColor} />
                <Text style={[styles.severityText, severityStyles.textColor]}>
                  {item.severity}
                </Text>
              </View>
              <Text style={[styles.confidenceText, severityStyles.textColor]}>
                {item.confidence}% confident
              </Text>
            </View>

            <Text style={styles.problemTitle}>{item.title}</Text>
            <Text style={styles.problemDescription}>{item.description}</Text>
          </View>
        );
      })}

      <TouchableOpacity onPress={() => setActiveTab('Routine')} style={styles.button}>
        <Text style={styles.buttonText}>View Personalized Recommendation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
