import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import styles from './style';
import Footer from '../../components/Footer/Footer';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import SingleAnalysis from '../../components/Analysis/SingleAnalysis.js'

const HomeScreen = () => {

  const [analysis, setAnalysis] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [score, setScore] = useState('');
  const navigation = useNavigation();


  const fetchData = async () => {
      const token = await SecureStore.getItemAsync('token');
      const myUser = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(myUser));
      try {
        const response = await axios.get('http://192.168.10.103:3000/analysis/all-user-analysis', {
          headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        setAnalysis(response.data.payload);
        setScore(response.data.payload[0].scores.general_skin_health_score);
        setToken(token);
      } catch (err) {
        console.error("error: ", err.response.data.message);
      }
    };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
          source={{ uri: `http://192.168.10.103:3000/${user.image_url}` }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={styles.headerName}>{user.first_name}</Text>
        </View>
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
          <View style={styles.rowScore}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressTitle}>{ score }%</Text>
          </View>
          <Text style={styles.progressLabel}>Skin health score</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {'width': `${score}%`}]} />
          </View>
          {/* <View style={styles.progressDetails}>
            <Text style={styles.progressStat}><Text style={styles.days}>12</Text>{"\n"}Days Tracked</Text>
            <Text style={styles.progressStat}><Text style={styles.percentage}>+15%</Text>{"\n"}Improvement</Text>
          </View> */}
        </View>

        <View style={styles.analysisSection}>
          <View style={styles.titleIcon}>
          <Text style={styles.sectionTitle}>Recent Analysis</Text>
          <Feather name="trending-up" size={24} color="#D89250" />
          </View>
          {
            analysis.map((a, index) => (
              <SingleAnalysis
                key={a.id || index}
                title={a.title || `Analysis ${index + 1}`}
                dateCreated={a.created_at}
                score={a?.scores?.general_skin_health_score || 0}
              />
            ))
          }

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
