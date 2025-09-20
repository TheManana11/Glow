import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './style';
import DoctorFooter from '../../components/DoctorFooter/DoctorFooter';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import SingleAnalysis from '../../components/Analysis/SingleAnalysis.js';
import { BACKEND_URL } from '@env';

const DoctorHomeScreen = ({ navigation }) => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  const getItems = async () => {
    const token = await SecureStore.getItemAsync('token');
    const myUser = await SecureStore.getItemAsync('user');
    setToken(token);
    setUser(JSON.parse(myUser));
  };

  useEffect(() => {
    async function fetchData() {
      await getItems();
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
            source={user.image_url ? { uri: `${BACKEND_URL}/${user.image_url}` } : require('../../assets/images/profile.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.headerName}>Welcome Dr.{user.first_name || ''}</Text>
        </View>

        <Text style={styles.headerText}>
          Welcome to{"\n"}
          <Text style={styles.bold}>Glow</Text>
        </Text>
        <Text style={styles.subText}>
          Connect with patients, provide expert consultations, and manage dermatology cases seamlessly.
        </Text>
        <Image
          source={require('../../assets/images/intro-doctor.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.tipSection}>
          <Text style={styles.tipTitle}>💡 Professional Tip</Text>
          <Text style={styles.tipHeader}>Quick Response</Text>
          <Text style={styles.tipText}>
            Respond to patient queries within 2 hours to maintain high satisfaction and care quality.
          </Text>
        </View>
      </ScrollView>

      <DoctorFooter />
    </View>
  );
};

export default DoctorHomeScreen;
