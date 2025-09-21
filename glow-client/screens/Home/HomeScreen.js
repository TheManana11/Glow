import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './style';
import Footer from '../../components/Footer/Footer';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import SingleAnalysis from '../../components/Analysis/SingleAnalysis.js';
import { BACKEND_URL } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnalysis, setAll } from '../../redux/slices/analysis.js';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const reduxAnalysis = useSelector(selectAnalysis);

  // const [analysis, setAnalysis] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [score, setScore] = useState(0);

  const fetchData = async () => {
    const token = await SecureStore.getItemAsync('token');
    const myUser = await SecureStore.getItemAsync('user');
    setUser(JSON.parse(myUser));
    try {
      const response = await axios.get(`${BACKEND_URL}/analysis/all-user-analysis`, {
        headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const fetchedAnalysis = response.data.payload || [];
      // setAnalysis(fetchedAnalysis);
      dispatch(setAll(fetchedAnalysis));
      if (fetchedAnalysis.length > 0) {
        setScore(fetchedAnalysis[0]?.scores?.general_skin_health_score || 0);
      } else {
        setScore(0);
      }
      setToken(token);
    } catch (err) {
      console.log("error: ", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


   const formattedDate = (date) => {
   return new Date(date).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
})};


 const openWP = () => {
    const WHATSAPP_NUMBER = '15551748531';
    const MESSAGE = 'Hello, I need some help with my skincare routine!';
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
    Linking.openURL(url)
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Failed!',
          text2: 'Failed to open whatsapp'
        });
      });
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
            source={user.image_url ? { uri: `${BACKEND_URL}/${user.image_url}` } : require('../../assets/images/profile.jpeg')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.headerName}>Welcome {user.first_name || ''}</Text>
        </View>

        <Text style={styles.headerText}>
          AI Powered{"\n"}
          <Text style={styles.bold}>Skin Analysis</Text>
        </Text>
        <Text style={styles.subText}>
          Get personalized skincare recommendations with cutting-edge AI. Start with your first face or hydration analysis and track your skin health journey.
        </Text>
        <Image
          source={require('../../assets/images/intro.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={() => navigation.navigate('AnalysisMain')} style={styles.button}>
          <Text style={styles.buttonText}>Start Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWP()} style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>AI Assistant</Text>
        </TouchableOpacity>

        {reduxAnalysis.length > 0 ? (
          <>
            <View style={styles.progressSection}>
              <View style={styles.rowScore}>
                <Text style={styles.progressTitle}>Your Progress</Text>
                <Text style={styles.progressTitle}>{score}%</Text>
              </View>
              <Text style={styles.progressLabel}>Skin health score</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${score}%` }]} />
              </View>
            </View>

            <View style={styles.analysisSection}>
              <View style={styles.titleIcon}>
                <Text style={styles.sectionTitle}>Recent Analysis</Text>
                <Feather name="trending-up" size={24} color="#D89250" />
              </View>
              { reduxAnalysis.slice(0,2).map((a, index) => (
                <SingleAnalysis
                  key={a.id || index}
                  id={a.id}
                  title={a.title || `Analysis - ${formattedDate(a.created_at)}`}
                  dateCreated={a.created_at}
                  score={a?.scores?.general_skin_health_score || 0}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyTitle}>No Analysis Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start your first analysis to see personalized recommendations and track your skin health journey.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AnalysisMain')} style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.tipSection}>
          <Text style={styles.tipTitle}>💡 Daily Tip</Text>
          <Text style={styles.tipHeader}>Stay Hydrated</Text>
          <Text style={styles.tipText}>
            Drinking 8 glasses of water daily helps keep skin soft and supple. Proper hydration boosts elasticity and helps maintain a healthier complexion.
          </Text>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default HomeScreen;
