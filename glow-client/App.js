import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './redux/store/store';

import LoginScreen from './screens/Login/LoginScreen'
import HomeScreen from "./screens/Home/HomeScreen";
import SignupScreen from "./screens/Signup/SignupScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import DoctorProfileScreen from './screens/DoctorProfile/DoctorProfileScreen';
import DoctorsScreen from './screens/Doctors/DoctorsScreen';
import MainScreen from './screens/Progress/MainScreen'
import AnalysisMain from './screens/AnalysisMain/AnalysisMain'
import SingleAnalysisScreen from './screens/SingleAnalysis/SingleAnalysisScreen';

import DoctorHomeScreen from "./screens/DoctorHome/HomeScreen";
import ChatsScreen from "./screens/Chats/ChatsScreen";



export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
    <Provider store={store}>
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
          <Stack.Screen name="SingleAnalysis" component={SingleAnalysisScreen} />

          <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />
          <Stack.Screen name="Chats" component={ChatsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

      <Toast />
      </>
  );
}


