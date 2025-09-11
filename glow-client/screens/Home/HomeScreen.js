import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import Footer from '../../components/Footer/Footer';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>AI Powered{"\n"}<Text style={styles.bold}>Skin Analysis</Text></Text>
        <Text style={styles.subText}>
          Get personalized skincare recommendations with cutting-edge AI. Start with your first face or hydration analysis and track your skin health journey.
        </Text>
        <Image
          source={require('../../assets/images/intro.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>

        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <Text style={styles.progressLabel}>Skin health score</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.progressDetails}>
            <Text style={styles.progressStat}><Text style={styles.days}>12</Text>{"\n"}Days Tracked</Text>
            <Text style={styles.progressStat}><Text style={styles.percentage}>+15%</Text>{"\n"}Improvement</Text>
          </View>
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Recent Analysis</Text>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisTitle}>Face Analysis</Text>
            <View style={styles.analysisRow}>
              <Text style={styles.analysisTime}>4 min ago</Text>
              <Text style={styles.analysisStatusSuccess}>Good</Text>
            </View>
          </View>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisTitle}>Hydration Check</Text>
            <View style={styles.analysisRow}>
              <Text style={styles.analysisTime}>3 days ago</Text>
              <Text style={styles.analysisStatusDanger}>Dehydrated</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipSection}>
          <Text style={styles.tipTitle}>💡 Daily Tip</Text>
          <Text style={styles.tipHeader}>Stay Hydrated</Text>
          <Text style={styles.tipText}>
            Drinking 8 glasses of water daily helps keep skin soft and supple. Proper hydration boosts elasticity and helps maintain a healthier complexion.
          </Text>
        </View>

        <TouchableOpacity style={styles.analysisNowButton}>
          <Text style={styles.analysisNowText}>Start Your Analysis Now</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default HomeScreen;
