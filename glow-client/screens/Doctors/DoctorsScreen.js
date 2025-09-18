import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './style';
import { Feather, Entypo } from '@expo/vector-icons';
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store'

const DoctorsScreen = () => {

  const [doctors, setDoctors] = useState([]);
  const fetchDoctors = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await axios.get(`${BACKEND_URL}/doctor`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      setDoctors(response.data.payload);
      console.log(response.data.payload);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Failed to fetch doctors',
      });
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, [])

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Verified Dermatologists</Text>
        <Text style={styles.subtitle}>
          Connect with certified skin health professional for expert consultation and personal care
        </Text>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors by name of specialty..."
            placeholderTextColor="#aaa"
          />
        </View>

        {doctors.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={ doc.user.image_url ? { uri: doc.user.image_url } : require('../../assets/images/profile.png')} style={styles.doctorImage} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.doctorName}>{doc.user.first_name} {doc.user.last_name}</Text>
                <Text style={styles.specialty}>{doc.specialty}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${doc.price_per_session}</Text>
                <Text style={styles.perSession}>per session</Text>
              </View>
            </View>

            <Text style={styles.text}>{doc.years_experience} years of experience</Text>

            <View style={styles.infoRow}>
              <Entypo name="location-pin" size={18} color="#808080" />
              <Text style={styles.text}>{doc.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="calendar" size={16} color='#808080' />
              <Text style={styles.text}>{doc.availability}</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="phone" size={16} color="#808080" />
              <Text style={styles.text}>{doc.user.phone_number}</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="mail" size={16} color="#808080" />
              <Text style={styles.text}>{doc.user.email}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Doctors</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default DoctorsScreen;
