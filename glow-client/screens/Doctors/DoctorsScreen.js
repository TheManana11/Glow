import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './style';
import { Feather, Entypo } from '@expo/vector-icons';
import Footer from '../../components/Footer/Footer'

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Jhonson',
    specialty: 'General Dermatology',
    specialtyColor: '#D89250',
    price: '$150',
    experience: '12 years of experience',
    location: 'Beirut. Lebanon',
    availability: 'Available today',
    availabilityColor: '',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@clinic.com',
    image: require('../../assets/images/avatar.jpg'),
  },
  {
    id: 2,
    name: 'Dr. Robert Milter',
    specialty: 'Cosmetic Dermatology',
    specialtyColor: '#D89250',
    price: '$120',
    experience: '7 years of experience',
    location: 'Beirut. Lebanon',
    availability: 'Next Available: Tomorrow',
    availabilityColor: '',
    phone: '+1 (555) 123-4567',
    email: 'robert.milter@clinic.com',
    image: require('../../assets/images/avatar.jpg'),
  },
];

const DoctorsScreen = () => {
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Verified Dermatologists</Text>
        <Text style={styles.subtitle}>
          Connect with certified skin health professional for expert consultation and personal care
        </Text>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors by name of specialty..."
            placeholderTextColor="#aaa"
          />
        </View>

        {doctors.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={doc.image} style={styles.doctorImage} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.doctorName}>{doc.name}</Text>
                <Text style={[styles.specialty, { color: doc.specialtyColor }]}>{doc.specialty}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{doc.price}</Text>
                <Text style={styles.perSession}>per session</Text>
              </View>
            </View>

            <Text style={styles.text}>{doc.experience}</Text>

            <View style={styles.infoRow}>
              <Entypo name="location-pin" size={18} color="#808080" />
              <Text style={styles.text}>{doc.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="calendar" size={16} color='#808080' />
              <Text style={styles.text}>{doc.availability}</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="phone" size={16} color="#808080" />
              <Text style={styles.text}>{doc.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="mail" size={16} color="#808080" />
              <Text style={styles.text}>{doc.email}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Doctors</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default DoctorsScreen;
