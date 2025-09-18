import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(null);

  const activeColor = '#D89250';
  const inactiveColor = '#000';

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user from SecureStore:', error);
      }
    };

    getUser();
  }, []);

  const handleProfileNavigation = () => {
    if (!user) return;

   
      navigation.navigate('Profile');
  };

  // Helper to determine if tab is active
  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.footer}>
      {/* Home */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.column}
      >
        <Feather
          name="home"
          size={24}
          color={isActive('Home') ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.footerText,
            { color: isActive('Home') ? activeColor : inactiveColor },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Analysis */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AnalysisMain')}
        style={styles.column}
      >
        <Feather
          name="bar-chart"
          size={24}
          color={isActive('AnalysisMain') ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.footerText,
            { color: isActive('AnalysisMain') ? activeColor : inactiveColor },
          ]}
        >
          Analysis
        </Text>
      </TouchableOpacity>

      {/* Doctors */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Doctors')}
        style={styles.column}
      >
        <Feather
          name="align-justify"
          size={24}
          color={isActive('Doctors') ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.footerText,
            { color: isActive('Doctors') ? activeColor : inactiveColor },
          ]}
        >
          Doctors
        </Text>
      </TouchableOpacity>

      {/* Progress */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Progress')}
        style={styles.column}
      >
        <Feather
          name="trending-up"
          size={24}
          color={isActive('Progress') ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.footerText,
            { color: isActive('Progress') ? activeColor : inactiveColor },
          ]}
        >
          Progress
        </Text>
      </TouchableOpacity>

      {/* Profile (Dynamic Role) */}
      <TouchableOpacity
        onPress={handleProfileNavigation}
        style={styles.column}
      >
        <Feather
          name="user"
          size={24}
          color={
            isActive('Profile') || isActive('DoctorProfile')
              ? activeColor
              : inactiveColor
          }
        />
        <Text
          style={[
            styles.footerText,
            {
              color:
                isActive('Profile') || isActive('DoctorProfile')
                  ? activeColor
                  : inactiveColor,
            },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
