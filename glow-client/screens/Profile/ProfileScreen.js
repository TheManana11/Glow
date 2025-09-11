import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import Footer from '../../components/Footer/Footer';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image
            source={require('../../assets/images/avatar.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Jhon Dee</Text>
          <Text style={styles.email}>jhon.dee@example.com</Text>
          <TouchableOpacity>
            <Text style={styles.changePhoto}>Change Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit-2" size={18} color="#D89250" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.row}>
            <Feather name="user" size={16} color="#D89250" />
            <Text style={styles.label}>First name</Text>
          </View>
          <Text style={styles.value}>Jhon</Text>

          <View style={styles.row}>
            <Feather name="user" size={16} color="#D89250" />
            <Text style={styles.label}>Last name</Text>
          </View>
          <Text style={styles.value}>Dee</Text>

          <View style={styles.row}>
            <MaterialIcons name="email" size={16} color="#D89250" />
            <Text style={styles.label}>Email</Text>
          </View>
          <Text style={styles.value}>jhon.dee@example.com</Text>

          <View style={styles.row}>
            <Feather name="calendar" size={16} color="#D89250" />
            <Text style={styles.label}>Age</Text>
          </View>
          <Text style={styles.value}>24 years old</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.row}>
            <Feather name="lock" size={16} color="#D89250" />
            <Text style={styles.value}>Change Password</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Feather name="log-out" size={16} color="#EB4D4D" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default ProfileScreen;
