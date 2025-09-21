import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DoctorFooter = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const activeColor = '#D89250';
  const inactiveColor = '#000';

  // Helper to determine if a tab is active
  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.footer}>
      {/* Home */}
      <TouchableOpacity
        onPress={() => navigation.navigate('DoctorHome')}
        style={styles.column}
      >
        <Feather
          name="home"
          size={24}
          color={isActive('DoctorHome') ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.footerText,
            { color: isActive('DoctorHome') ? activeColor : inactiveColor },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Chats */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Chats')}
        style={styles.column}
      >
        <Feather
          name="message-circle"
          size={24}
          color={isActive('Chats') ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.footerText,
            { color: isActive('Chats') ? activeColor : inactiveColor },
          ]}
        >
          Chats
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorFooter;
