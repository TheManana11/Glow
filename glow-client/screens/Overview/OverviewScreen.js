import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./style";
import { useSelector } from "react-redux";
import { selectAnalysis } from "../../redux/slices/analysis";

const OverviewScreen = () => {
  const analysis = useSelector(selectAnalysis);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Overall Score</Text>
          <Text style={styles.cardValue}>{analysis[0].scores.general_skin_health_score}%</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-up" size={16} color="#4CAF50" />
          <Text style={styles.percentagePositive}>+1.3%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Acne Score</Text>
          <Text style={styles.cardValue}>{analysis[0].scores.acne_score}</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-down" size={16} color="red" />
          <Text style={styles.percentageNegative}>-2.4%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Hydration</Text>
          <Text style={styles.cardValue}>{analysis[0].scores.hydration_score}%</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-up" size={16} color="#4CAF50" />
          <Text style={styles.percentagePositive}>+12%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Texture</Text>
          <Text style={styles.cardValue}>{analysis[0].scores.texture_score}</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-up" size={16} color="#4CAF50" />
          <Text style={styles.percentagePositive}>+0.9%</Text>
        </View>
      </View>
    </View>
  );
};

export default OverviewScreen;