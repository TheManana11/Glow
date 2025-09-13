import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import Footer from '../../components/Footer/Footer';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(require('../../assets/images/avatar.jpg'));
  const [base64Image, setBase64Image] = useState(null); 

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to your photos.");
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
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image
            source={profileImage}
            style={styles.avatar}
          />
          <Text style={styles.name}>Jhon Dee</Text>
          <Text style={styles.email}>jhon.dee@example.com</Text>

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
              <Text style={styles.value}>Jhon</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Feather name="user" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>Last name</Text>
              <Text style={styles.value}>Dee</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Feather name="mail" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>jhon.dee@example.com</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Feather name="calendar" size={20} color="#D89250" />
            <View style={styles.column}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>24 years old</Text>
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
};

export default ProfileScreen;
