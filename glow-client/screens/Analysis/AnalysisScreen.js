import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';

export default function AnalysisScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.uploadBox}>
        <Feather name="upload-cloud" size={80} color="#000" />
        <Text style={styles.uploadText}>Upload Your Photo</Text>
        <TouchableOpacity style={styles.chooseButton}>
          <Text style={styles.chooseButtonText}>Choose File</Text>
        </TouchableOpacity>
        <Text style={styles.fileInfo}>
          Supported formats: JPG, PNG, HEIC • Max size: 10MB
        </Text>
        <Text style={styles.note}>
          For best results, use good lighting and focus on the area of concern
        </Text>
      </View>

      {/* Tips Section */}
      <Text style={styles.tipsTitle}>Tips for Best Analysis Results</Text>
      <Text style={styles.tipsSubtitle}>
        Follow these guidelines to ensure the most accurate AI analysis of your skin.
      </Text>

      {/* Tips */}
      <View style={styles.tipCard}>
        <Feather style={[styles.icon, {backgroundColor: '#DBEAFE'}]} name="sun" size={24} color="#3131F2" />
        <Text style={styles.tipTitle}>Good Lighting</Text>
        <Text style={styles.tipText}>
          Use natural light or bright, even lighting for accurate analysis. Avoid harsh shadows or dim conditions.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Feather style={[styles.icon, { backgroundColor: '#F3E8FF'}]} name="eye" size={24} color="#9E54E0" />
        <Text style={styles.tipTitle}>Clear Focus</Text>
        <Text style={styles.tipText}>
          Ensure the area of concern is in sharp focus and clearly visible. Hold your device steady when taking photos.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Feather style={[styles.icon, {backgroundColor: '#CEFAFE'}]} name="droplet" size={24} color="#0092B8" />
        <Text style={styles.tipTitle}>Clean Skin</Text>
        <Text style={styles.tipText}>
          Remove makeup and ensure skin is clean for accurate assessment. This helps our AI detect true skin conditions.
        </Text>
      </View>
    </ScrollView>
  );
}
