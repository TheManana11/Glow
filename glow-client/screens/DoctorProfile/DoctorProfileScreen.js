import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './style';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/Footer/Footer';

const DoctorProfileScreen = () => {

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/avatar.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconContainer}>
            <Feather name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Your Professional Photo</Text>
        <Text style={styles.subtitle}>This will be visible to patients</Text>
        <TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Professional Information</Text>

        <Text style={styles.inputLabel}>Medical Specialty</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Feather name="activity" size={18} color="#D89250" />
          <TextInput style={styles.textInput} placeholder="Write your speciality"/>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Years of Experience</Text>
        <View style={styles.inputWrapper}>
          <Feather name="calendar" size={18} color="#D89250" />
          <TextInput style={styles.textInput} placeholder="12" keyboardType="numeric" />
        </View>

        <Text style={styles.inputLabel}>Location</Text>
        <View style={styles.inputWrapper}>
          <Feather name="map-pin" size={18} color="#D89250" />
          <TextInput style={styles.textInput} placeholder="Beirut, Lebanon" />
        </View>

        <Text style={styles.inputLabel}>Price per Session ($)</Text>
        <View style={styles.inputWrapper}>
          <Feather name="dollar-sign" size={18} color="#D89250" />
          <TextInput style={styles.textInput} placeholder="100" keyboardType="numeric" />
        </View>

        <Text style={styles.inputLabel}>Availability</Text>
        <View style={styles.inputWrapper}>
          <Feather name="clock" size={18} color="#D89250" />
          <TextInput style={styles.textInput} placeholder="Available Today" />
        </View>
      </View>

      <View style={styles.verificationSection}>
        <Text style={styles.verificationTitle}>Document Verification Required</Text>
        <Text style={styles.verificationSubtitle}>
          To ensure patient safety and maintain platform integrity, all doctors must verify their identity and medical credentials.
        </Text>

        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>National ID</Text>
          <Text style={styles.uploadSubtitle}>
            Upload a clear photo of your government-issued ID (passport, driver's license, or national ID card)
          </Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Feather name="upload" size={18} color="#D89250" />
            <Text style={styles.uploadText}>Upload National ID</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Medical License</Text>
          <Text style={styles.uploadSubtitle}>
            Upload your current medical license or board certification document
          </Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Feather name="upload" size={18} color="#D89250" />
            <Text style={styles.uploadText}>Upload Medical License</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.verificationNoteBox}>
          <MaterialIcons name="info" size={18} color="#D89250" />
          <Text style={styles.verificationNote}>
            Document verification typically takes 24–48 hours. You'll receive an email notification once your documents are approved.
          </Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <Text style={styles.noteText}>
          Please fill all fields and verify your documents to save
        </Text>
      </View>
    </ScrollView>
      <Footer />
    </View>

  );
};

export default DoctorProfileScreen;
