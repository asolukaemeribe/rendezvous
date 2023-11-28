import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import Login from '../pages/Login';
import colors from '../assets/colors/colors';


// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    // TODO: Replace with Expo Router!! This is using React Navigation  
    // Apparently Expo Router is much easier to work with - Jason
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = 'Login' component = {Login} options = {{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


registerRootComponent(App);