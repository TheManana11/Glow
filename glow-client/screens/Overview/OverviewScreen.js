import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./style";

const OverviewScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Overall Score</Text>
          <Text style={styles.cardValue}>78%</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-up" size={16} color="#4CAF50" />
          <Text style={styles.percentagePositive}>+1.3%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Acne Score</Text>
          <Text style={styles.cardValue}>3.1</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-down" size={16} color="red" />
          <Text style={styles.percentageNegative}>-2.4%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Hydration</Text>
          <Text style={styles.cardValue}>94%</Text>
        </View>
        <View style={styles.cardRight}>
          <Feather name="trending-up" size={16} color="#4CAF50" />
          <Text style={styles.percentagePositive}>+12%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>Texture</Text>
          <Text style={styles.cardValue}>7.8</Text>
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