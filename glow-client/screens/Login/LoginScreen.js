import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
    const response = await axios.post('http://192.168.10.103:3000/users/login', formData,{
      headers: { 'Content-Type': 'application/json',
       },
       timeout: 10000, 
    });

    const token = response.data.token;
    await SecureStore.setItemAsync('token', token);

    setFormData({
      email: "",
      password: ""
    });
    navigation.navigate('Home')
    } catch (error) {
      console.log('====================================');
      console.log("Error Message: ", error.response.data.message);
      console.log('====================================');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>SkinCare AI</Text>
      <Text style={styles.subtitle}>Welcome back to your skin journey</Text>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Login</Text>
        <Text style={styles.formSubtitle}>
          Enter you credentials to access your account
        </Text>

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

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWithIcon}>
          <Feather name="lock" size={18} color="#D89250" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          New to Glow?{"  "}
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={styles.loginLink}
          >
            Create an account
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
