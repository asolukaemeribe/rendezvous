import IPhone13145 from "./screens/profilePreference";
import CreateAccount from "./screens/createAccount";
import Login from "./screens/login";
import ProfilePage from "./screens/profilePage";
import ProfileCreation from "./screens/profileCreation";
import PictureSelection from "./screens/pictureSelection";
import PeopleNearbyStack from "./screens/peopleNearby";
import UserInterestsPage from "./screens/userInterests";
import MessagePage from "./screens/messagePage";
import MatchesListPage from "./screens/matchesListPage"
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
//import { AppLoading } from "expo";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import ViewPotentialMatchesPage from "./screens/viewPotentialMatchesPage";
import AddUserInfo from "./screens/addUserInfo";
import DatePreferencesPage from "./screens/datePreferences";
import { SafeAreaProvider } from "react-native-safe-area-context"
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { FIREBASE_AUTH } from "./FirebaseConfig";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AuthContext } from './AppAuthContext'
const config = require('./config.json');

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

export const AuthedStack = () => {
  return (
    // <>
      /* <NavigationContainer> */
        // <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="AuthedTabs" component={AuthedTabs} options={{ headerShown: false }} />
            <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }} />
          </Stack.Navigator>
        // </SafeAreaProvider>
      /* </NavigationContainer> */
    /* </> */
  )
}

const AuthedTabs = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#FF000099",
        inactiveTintColor: "#00000099",
        activeBackgroundColor: "#00000022",
        tabStyle: {
          width: 270,
          alignSelf: "center"
        }
      }}
      appearance={{
        whenActiveShow: "icon-only",
        whenInactiveShow: "icon-only",
        floating: "true",
        dotSize: "small"
      }}
      id="tabs"
      screenOptions={{ headerShown: false }}
      initialRouteName="PeopleNearbyStack"
    >
      <Tabs.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon
              icon={faUser}
              size={30}
              color={focused ? color : "#222222"}
            // focused={focused}
            // color={color}
            />
          )
        }}
        initialParams={{ userIsSelf: true }}
      // userID: userID
      />
      <Tabs.Screen
        name="PeopleNearbyStack"
        component={PeopleNearbyStack}
        // options={{ headerShown: false }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Foundation
              name="home"
              size={30}
              color={focused ? color : "#222222"}
              focused={focused}
            // color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="MatchesListPage"
        component={MatchesListPage}
        // options={({ route }) => ({
        //   headerShown: false,
        //   tabBarVisible: this.getTabBarVisibility(route),
        //   tabBarIcon: ({ focused, color, size }) => (
        //     <Ionicons
        //       name="chatbubble-ellipses"
        //       size={30}
        //       color={focused ? color : "#222222"}
        //       focused={focused}
        //     />
        //   ),
        // })}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="chatbubble-ellipses"
              size={30}
              color={focused ? color : "#222222"}
              focused={focused}
            // color={color}
            />
          )
        }}
      />
    </Tabs.Navigator>
  )
}


export const UnauthedStack = () => {
  return (
        // <SafeAreaProvider>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
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
          </Stack.Navigator>
        // </SafeAreaProvider>
  )
}

export const CreatingAccountStack = () => {
  return (
        // <SafeAreaProvider>
          <Stack.Navigator initialRouteName="ProfileCreation" screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="ProfileCreation"
              component={ProfileCreation}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="ProfilePage"
              component={ProfilePage}
              options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
              name="ViewPotentialMatchesPage"
              component={ViewPotentialMatchesPage}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="SelectInterestsPage"
              component={UserInterestsPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PictureSelection"
              component={PictureSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddUserInfoPage"
              component={AddUserInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DatePreferencesPage"
              component={DatePreferencesPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        // </SafeAreaProvider>
  )
}

const Index = () => {
  const { signOut, getUserID, getAuthState } = React.useContext(AuthContext)

  let authState = getAuthState();
  useEffect(() => {
    // get location
    console.log('index authState ' + getAuthState().userToken + " " + getAuthState().creatingAccount + " " + getAuthState().creatingAccountData);
  }, []);

  return (
    (getAuthState().userToken == null) ?
      (getAuthState().creatingAccount ? (<CreatingAccountStack />) : (<UnauthedStack />)) :
      (<AuthedStack />)
  )
}

// export default Index;