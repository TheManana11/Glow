import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.column}><Feather name="home" size={24} color="black" /><Text style={styles.footerText}>Home</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="bar-chart" size={24} color="black" /><Text style={styles.footerText}>Analysis</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="align-justify" size={24} color="black" /><Text style={styles.footerText}>Doctors</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="trending-up" size={24} color="black" /><Text style={styles.footerText}>Progress</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="user" size={24} color="black" /><Text style={styles.footerText}>Profile</Text></TouchableOpacity>
    </View>
  );
};

export default Footer;
