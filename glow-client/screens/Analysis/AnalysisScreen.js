import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { addOne } from '../../redux/slices/analysis';

export default function AnalysisScreen({ setCanGoToScreens, setActiveTab }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const openCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'You need to allow camera access to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        base64: true, 
      });

      if (!result.canceled) {
        const photo = result.assets[0];

        const extension = photo.uri.split('.').pop().toLowerCase();
        let mimeType = 'image/jpeg';
        if (extension === 'png') mimeType = 'image/png';
        const base64WithPrefix = `data:${mimeType};base64,${photo.base64}`;

        await uploadPhoto(base64WithPrefix);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Toast.show({
        type: 'error',
        text1: 'Camera Error',
        text2: 'Failed to take a photo. Please try again.',
      });
    }
  };

  const uploadPhoto = async (base64Image) => {

      const token = await SecureStore.getItemAsync('token');

      try{
      const response = await axios.post(
        `${BACKEND_URL}/analysis`,
        { image_url: base64Image },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Upload Successful',
        text2: 'Analysis done successfully',
      });
      dispatch(addOne(response.data.payload));
      setCanGoToScreens(true);
      setActiveTab('Problems');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: error.response?.data?.message || 'Something went wrong while uploading.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.uploadBox}>
        <Feather name="upload-cloud" size={80} color="#000" />
        <Text style={styles.uploadText}>Upload Your Photo</Text>

        <TouchableOpacity style={styles.chooseButton} onPress={openCamera}>
          <Text style={styles.chooseButtonText}>
            {loading ? 'Uploading...' : 'Open Camera'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.fileInfo}>
          Supported formats: JPG, PNG, HEIC • Max size: 10MB
        </Text>
        <Text style={styles.note}>
          For best results, use good lighting and focus on the area of concern
        </Text>
      </View>

      <Text style={styles.tipsTitle}>Tips for Best Analysis Results</Text>
      <Text style={styles.tipsSubtitle}>
        Follow these guidelines to ensure the most accurate AI analysis of your skin.
      </Text>

      <View style={styles.tipCard}>
        <Feather
          style={[styles.icon, { backgroundColor: '#DBEAFE' }]}
          name="sun"
          size={24}
          color="#3131F2"
        />
        <Text style={styles.tipTitle}>Good Lighting</Text>
        <Text style={styles.tipText}>
          Use natural light or bright, even lighting for accurate analysis. Avoid harsh shadows or dim conditions.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Feather
          style={[styles.icon, { backgroundColor: '#F3E8FF' }]}
          name="eye"
          size={24}
          color="#9E54E0"
        />
        <Text style={styles.tipTitle}>Clear Focus</Text>
        <Text style={styles.tipText}>
          Ensure the area of concern is in sharp focus and clearly visible. Hold your device steady when taking photos.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Feather
          style={[styles.icon, { backgroundColor: '#CEFAFE' }]}
          name="droplet"
          size={24}
          color="#0092B8"
        />
        <Text style={styles.tipTitle}>Clean Skin</Text>
        <Text style={styles.tipText}>
          Remove makeup and ensure skin is clean for accurate assessment. This helps our AI detect true skin conditions.
        </Text>
      </View>
    </ScrollView>
  );
}
