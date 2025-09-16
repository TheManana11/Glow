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
          if (parsedUser?.image_url) {
            setProfileImage({ uri: `${BACKEND_URL}/${parsedUser.image_url}` });
          } else {
            setProfileImage(null);
          }
        } else {
          setProfileImage(null);
        }
      } catch (error) {
        setProfileImage(null);
      }
    };
    fetchUser();
  }, []);

  const pickImage = async () => {
    try {
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

      if (result.canceled) return;

      const pickedImage = result.assets[0];
      const uri = pickedImage.uri;
      let extension = uri.split('.').pop()?.toLowerCase();
      let mimeType = 'image/jpeg';
      if (extension === 'png') mimeType = 'image/png';
      else if (extension === 'jpg' || extension === 'jpeg') mimeType = 'image/jpeg';
      else if (extension === 'webp') mimeType = 'image/webp';

      const fullBase64 = `data:${mimeType};base64,${pickedImage.base64}`;
      setProfileImage({ uri: pickedImage.uri });
      setBase64Image(fullBase64);

      const token = await SecureStore.getItemAsync('token');
      if (!token || !user?.id) return;

      const response = await axios.patch(
        `${BACKEND_URL}/users/profile-pic/${user.id}`,
        { image_url: fullBase64 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const updatedUser = { ...user, image_url: response.data.image_url };
      setUser(updatedUser);
      SecureStore.setItemAsync('user', JSON.stringify(updatedUser));

      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile picture has been updated successfully.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: error.response?.data?.message || 'Something went wrong while uploading the image.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image
            source={profileImage ? profileImage : require('../../assets/images/profile.png')}
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
  );
}
