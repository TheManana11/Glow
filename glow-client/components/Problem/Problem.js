import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';


export default function Problem({ item }) {

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
    
    const severityStyles = getSeverityStyles(item.severity);
    return(
        <View style={[styles.problemCard, severityStyles.cardStyle]}>
            <View style={styles.problemHeader}>
              <View style={styles.severityContainer}>
                <Feather name="alert-triangle" size={16} color={severityStyles.iconColor} />
                <Text style={[styles.severityText, severityStyles.textColor]}>
                  {item?.severity}
                </Text>
              </View>
              <Text style={[styles.confidenceText, severityStyles.textColor]}>
                {item?.confidence}% confident
              </Text>
            </View>

            <Text style={styles.problemTitle}>{item?.title}</Text>
            <Text style={styles.problemDescription}>{item?.description}</Text>
          </View>
    )
}