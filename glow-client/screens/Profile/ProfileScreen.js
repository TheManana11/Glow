import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { BACKEND_URL } from '@env';
import Footer from '../../components/Footer/Footer';
import styles from './style';
import Toast from 'react-native-toast-message';


export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null); 
  const [base64Image, setBase64Image] = useState(null);   
  const [user, setUser] = useState(null);                 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          if (parsedUser && parsedUser.image_url) {
            setProfileImage({ uri: `${BACKEND_URL}/${parsedUser.image_url}` });
          } else {
            setProfileImage(require('../../assets/images/profile.png'));
          }
        } else {
          setProfileImage(require('../../assets/images/profile.png'));
        }
      } catch (error) {
        console.error('Error loading user from SecureStore:', error);
        setProfileImage(require('../../assets/images/profile.png'));
      }
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'You need to allow access to your photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const pickedImage = result.assets[0];
        setProfileImage({ uri: pickedImage.uri }); 
        setBase64Image(pickedImage.base64);

        const token = await SecureStore.getItemAsync('token');
        if (!token || !user?.id) return;
        try {
          
          const response = await axios.patch(
          `${BACKEND_URL}/users/profile-pic/${user.id}`,
          { image_url: pickedImage.base64 },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: error.response.data.message
          });
        }
      }
    } 

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image
            source={
              profileImage?.uri !== `${BACKEND_URL}/${user?.image_url}`
                ? require('../../assets/images/profile.png')
                : profileImage
            }
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user ? `${user.first_name} ${user.last_name}` : 'Guest User'}
          </Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>

          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changePhoto}>Change Profile Picture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit-2" size={18} color="#D89250" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.row}>
            <Feather name="user" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>First name</Text>
              <Text style={styles.value}>{user?.first_name || '-'}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Feather name="user" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>Last name</Text>
              <Text style={styles.value}>{user?.last_name || '-'}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Feather name="mail" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user?.email || '-'}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Feather name="calendar" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{user?.age ? `${user.age} years old` : '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.row}>
            <Feather name="lock" size={20} color="#D89250" />
            <Text style={styles.value}>Change Password</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Feather name="log-out" size={20} color="#EB4D4D" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  )
}
