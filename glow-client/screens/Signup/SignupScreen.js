import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import styles from "./style";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BACKEND_URL } from '@env'
import Toast from 'react-native-toast-message';
import Verification from '../../components/Verification/Verification'

export default function SignupScreen({ navigation }) {

  const [message, setMessage] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone_number: "",
    password: "",
    role: "",
  });

  const handleSubmit = async () => {
    try {
    const response = await axios.post(`${BACKEND_URL}/users/register`, formData,{
      headers: { 'Content-Type': 'application/json',
       }, 
    });

    const token = response.data.token;
    const user = response.data.payload;

    if(user.role === 'doctor'){
      // const doctor_resposne = await axios.post(`${BACKEND_URL}/doctor/user-id`, { id: user.id }, {
      //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
      // });
      setMessage(true);
       setFormData({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        phone_number: "",
        password: "",
        role: "",
      });
    }else{
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
  
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        phone_number: "",
        password: "",
        role: "",
      });
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Registered successfully',
      });
        navigation.navigate('Home');
    }

    } catch (error) {
       Toast.show({
      type: 'error',
      text1: 'Error!',
      text2: error.response.data.message,
    });
    }
  }

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage(false);
      }, 5000); // 5 seconds
    }

    return () => clearTimeout(timer);
  }, [message]);

  if(message) return <Verification />
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Join our SkinCare AI</Text>
      <Text style={styles.subtitle}>Start your personalized skin journey</Text>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Create Account</Text>
        <Text style={styles.formSubtitle}>
          Fill in your details to get started
        </Text>

        <View style={styles.row}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>First Name</Text>
            <View style={styles.inputWithIcon}>
              <Feather
                name="user"
                size={18}
                color="#D89250"
                style={styles.icon}
              />
              <TextInput
                placeholder="e.g. Ahmad"
                style={styles.textInput}
                value={formData.first_name}
                onChangeText={(text) =>
                  setFormData({ ...formData, first_name: text })
                }
              />
            </View>
          </View>

          <View style={styles.inputHalf}>
            <Text style={styles.label}>Last Name</Text>
            <View style={styles.inputWithIcon}>
              <Feather
                name="user"
                size={18}
                color="#D89250"
                style={styles.icon}
              />
              <TextInput
                placeholder="e.g. Manana"
                style={styles.textInput}
                value={formData.last_name}
                onChangeText={(text) =>
                  setFormData({ ...formData, last_name: text })
                }
              />
            </View>
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWithIcon}>
          <Feather name="mail" size={18} color="#D89250" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="e.g. example@gmail.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <Text style={styles.label}>Age</Text>
        <View style={styles.inputWithIcon}>
          <Feather
            name="calendar"
            size={18}
            color="#D89250"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="e.g. 24"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
          />
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWithIcon}>
          <Feather name="phone" size={18} color="#D89250" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="e.g. +96171236842"
            keyboardType="phone-pad"
            value={formData.phone_number}
            onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWithIcon}>
          <Feather name="lock" size={18} color="#D89250" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setFormData({ ...formData, role: "doctor" })}
          >
            <View style={styles.radioCircle}>
              {formData.role === "doctor" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setFormData({ ...formData, role: "patient" })}
          >
            <View style={styles.radioCircle}>
              {formData.role === "patient" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>Patient</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already a member in Glow?{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
