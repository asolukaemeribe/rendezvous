const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import IPhone13145 from "./screens/profilePreference";
import CreateAccount from "./screens/createAccount";
import Login from "./screens/login";
import ProfilePage from "./screens/profilePage";
import ProfileCreation from "./screens/profileCreation";
import PictureSelection from "./screens/pictureSelection";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";

// SplashScreen.preventAutoHideAsync();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !error) {
    // return <AppLoading/>;
    return null;
  }

  return (
    <>
      <NavigationContainer >
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="IPhone13145"
              component={IPhone13145}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="ProfileCreation"
              component={ProfileCreation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PictureSelection"
              component={PictureSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfilePage"
              component={ProfilePage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
