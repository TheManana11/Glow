import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Footer = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user'); 
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user from SecureStore:', error);
      }
    };

    getUser();
  }, []);

  const handleProfileNavigation = () => {
    if (!user) return; 

    if (user.role === 'patient') {
      navigation.navigate('Profile'); 
    } else if (user.role === 'doctor') {
      navigation.navigate('DoctorProfile'); 
    } else {
      console.warn('Unknown role:', user.role);
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.column}>
        <Feather name="home" size={24} color="black" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.column}>
        <Feather name="bar-chart" size={24} color="black" />
        <Text style={styles.footerText}>Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Doctors')} style={styles.column}>
        <Feather name="align-justify" size={24} color="black" />
        <Text style={styles.footerText}>Doctors</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.column}>
        <Feather name="trending-up" size={24} color="black" />
        <Text style={styles.footerText}>Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfileNavigation} style={styles.column}>
        <Feather name="user" size={24} color="black" />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
