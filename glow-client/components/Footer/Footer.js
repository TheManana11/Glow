import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.column}><Feather name="home" size={24} color="black" /><Text style={styles.footerText}>Home</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="bar-chart" size={24} color="black" /><Text style={styles.footerText}>Analysis</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="align-justify" size={24} color="black" /><Text style={styles.footerText}>Doctors</Text></TouchableOpacity>
      <TouchableOpacity style={styles.column}><Feather name="trending-up" size={24} color="black" /><Text style={styles.footerText}>Progress</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.column}><Feather name="user" size={24} color="black" /><Text style={styles.footerText}>Profile</Text></TouchableOpacity>
    </View>
  );
};

export default Footer;
