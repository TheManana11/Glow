import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Login/LoginScreen'
import HomeScreen from "./screens/Home/HomeScreen";
import SignupScreen from "./screens/Signup/SignupScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import DoctorProfileScreen from './screens/DoctorProfile/DoctorProfileScreen';
import DoctorsScreen from './screens/Doctors/DoctorsScreen';
import MainScreen from './screens/Progress/MainScreen'
import AnalysisMain from './screens/AnalysisMain/AnalysisMain'

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
          <Stack.Screen name="Doctors" component={DoctorsScreen} />
          <Stack.Screen name="Progress" component={MainScreen} />
          <Stack.Screen name="AnalysisMain" component={AnalysisMain} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


