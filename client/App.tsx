// const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
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
import Index from "./Index";
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
import { AuthContextProvider } from "./AppAuthContext";
import { CreatingAccountStack, AuthedStack, UnauthedStack } from "./Index";
import { useAuthContext } from "./AppAuthContext"
// import AuthedStack from "./Index";
// import UnauthedStack from "./Index";
// import { UnauthedStack } from "./Index";

const config = require('./config.json');
// SplashScreen.preventAutoHideAsync();
// const Tabs = AnimatedTabBarNavigator();
// const AuthContext = React.createContext();

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

// const AuthedStack = () => {
//   return (
//     // <>
//     /* <NavigationContainer> */
//     // <SafeAreaProvider>
//     <Stack.Navigator>
//       <Stack.Screen name="AuthedTabs" component={AuthedTabs} options={{ headerShown: false }} />
//       <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }} />
//     </Stack.Navigator>
//     // </SafeAreaProvider>
//     /* </NavigationContainer> */
//     /* </> */
//   )
// }

// const AuthedTabs = () => {
//   return (
//     <Tabs.Navigator
//       tabBarOptions={{
//         activeTintColor: "#FF000099",
//         inactiveTintColor: "#00000099",
//         activeBackgroundColor: "#00000022",
//         tabStyle: {
//           width: 270,
//           alignSelf: "center"
//         }
//       }}
//       appearance={{
//         whenActiveShow: "icon-only",
//         whenInactiveShow: "icon-only",
//         floating: "true",
//         dotSize: "small"
//       }}
//       id="tabs"
//       screenOptions={{ headerShown: false }}
//       initialRouteName="PeopleNearbyStack"
//     >
//       <Tabs.Screen
//         name="ProfilePage"
//         component={ProfilePage}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => (
//             <FontAwesomeIcon
//               icon={faUser}
//               size={30}
//               color={focused ? color : "#222222"}
//             // focused={focused}
//             // color={color}
//             />
//           )
//         }}
//         initialParams={{ userIsSelf: true }}
//       // userID: userID
//       />
//       <Tabs.Screen
//         name="PeopleNearbyStack"
//         component={PeopleNearbyStack}
//         // options={{ headerShown: false }}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => (
//             <Foundation
//               name="home"
//               size={30}
//               color={focused ? color : "#222222"}
//               focused={focused}
//             // color={color}
//             />
//           )
//         }}
//       />
//       <Tabs.Screen
//         name="MatchesListPage"
//         component={MatchesListPage}
//         // options={({ route }) => ({
//         //   headerShown: false,
//         //   tabBarVisible: this.getTabBarVisibility(route),
//         //   tabBarIcon: ({ focused, color, size }) => (
//         //     <Ionicons
//         //       name="chatbubble-ellipses"
//         //       size={30}
//         //       color={focused ? color : "#222222"}
//         //       focused={focused}
//         //     />
//         //   ),
//         // })}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name="chatbubble-ellipses"
//               size={30}
//               color={focused ? color : "#222222"}
//               focused={focused}
//             // color={color}
//             />
//           )
//         }}
//       />
//     </Tabs.Navigator>
//   )
// }


// const UnauthedStack = () => {
//   return (
//     // <SafeAreaProvider>
//     <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CreateAccount"
//         component={CreateAccount}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//     // </SafeAreaProvider>
//   )
// }

// const CreatingAccountStack = () => {
//   return (
//     // <SafeAreaProvider>
//     <Stack.Navigator initialRouteName="ProfileCreation" screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="ProfileCreation"
//         component={ProfileCreation}
//         options={{ headerShown: false }}
//       />
//       {/* <Stack.Screen
//               name="ProfilePage"
//               component={ProfilePage}
//               options={{ headerShown: false }}
//             /> */}
//       {/* <Stack.Screen
//               name="ViewPotentialMatchesPage"
//               component={ViewPotentialMatchesPage}
//               options={{ headerShown: false }}
//             /> */}
//       <Stack.Screen
//         name="SelectInterestsPage"
//         component={UserInterestsPage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="PictureSelection"
//         component={PictureSelection}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="AddUserInfoPage"
//         component={AddUserInfo}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="DatePreferencesPage"
//         component={DatePreferencesPage}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//     // </SafeAreaProvider>
//   )
// }


const App = () => {
  // const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  // function authReducer(prevAuthState, action) {
  //   switch (action.type) {
  //     case 'RESTORE_TOKEN':
  //       console.log("restore");
  //       return {
  //         ...prevAuthState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'SIGN_IN':
  //       console.log("sign in");
  //       return {
  //         ...prevAuthState,
  //         isSignout: false,
  //         userToken: action.token,
  //         creatingAccountData: null,
  //         creatingAccount: false,
  //       };
  //     case 'SIGN_OUT':
  //       console.log("sign out");
  //       return {
  //         ...prevAuthState,
  //         isSignout: true,
  //         userToken: null,
  //         creatingAccount: false,
  //         creatingAccountData: null
  //       };
  //     case 'CREATING_ACCOUNT':
  //       console.log("creatingacc");
  //       return {
  //         ...prevAuthState,
  //         creatingAccount: true
  //       }
  //     case 'CREATING_ACCOUNT_DATA':
  //       console.log(" creating account data now with " + action.accountData)
  //       return {
  //         ...prevAuthState,
  //         creatingAccount: true,
  //         creatingAccountData: action.accountData,
  //       }
  //     default:
  //       console.log("default")
  //       return prevAuthState;
  //   }
  // }

  // const initialAuthState = {
  //   isLoading: false,
  //   isSignout: true,
  //   userToken: null,
  //   creatingAccount: false,
  //   creatingAccountData: "testcreatingaccountdata"
  // }

  // const [authState, setAuthState] = React.useReducer(
  //   (prevAuthState, action) => {
  //     switch (action.type) {
  //       case 'RESTORE_TOKEN':
  //         console.log("restore");
  //         return {
  //           ...prevAuthState,
  //           userToken: action.token,
  //           isLoading: false,
  //         };
  //       case 'SIGN_IN':
  //         console.log("sign in");
  //         return {
  //           ...prevAuthState,
  //           isSignout: false,
  //           userToken: action.token,
  //           creatingAccountData: null,
  //           creatingAccount: false,
  //         };
  //       case 'SIGN_OUT':
  //         console.log("sign out");
  //         return {
  //           ...prevAuthState,
  //           isSignout: true,
  //           userToken: null,
  //           creatingAccount: false,
  //           creatingAccountData: null
  //         };
  //       case 'CREATING_ACCOUNT':
  //         console.log("creatingacc");
  //         return {
  //           ...prevAuthState,
  //           creatingAccount: true
  //         }
  //       case 'CREATING_ACCOUNT_DATA':
  //         console.log(" creating account data now with " + action.accountData)
  //         return {
  //           ...prevAuthState,
  //           creatingAccount: true,
  //           creatingAccountData: action.accountData,
  //         }
  //       default:
  //         console.log("default")
  //         return prevAuthState;
  //     }
  //   },
  //   {
  //     isLoading: false,
  //     isSignout: true,
  //     userToken: null,
  //     creatingAccount: false,
  //     creatingAccountData: "testcreatingaccountdata"
  //   });



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


  // const auth = FIREBASE_AUTH;
  // const user = auth.currentUser;
  // if (user) {
  //   setAuthState({ type: 'SIGN_IN', token: user.uid });
  //   console.log("Application has started. User is signed in so navigating to profile page of user with uid: " + uid)
  //   // navigation.navigate("ProfilePage", {userID: uid});
  // } else {
  //   setAuthState({ type: 'SIGN_OUT' });
  //   console.log("Application has started; no user is signed in.")
  // }
  // const authContext = useAuthContext();
  const authContext = useAuthContext();
  const authState = authContext && authContext.getAuthState();

  // const authState = () => {getAuthState()};

  return (
    <NavigationContainer>
      {/* <AuthContext.Provider value={{authState: authState, authContext: authContext}/}> */}
        <AuthContextProvider>
        <Stack.Navigator>

          {getAuthState().userToken == null ?
            (
              authState.creatingAccount ?
                (
                  <Stack.Screen name="CreatingAccountStack" component={CreatingAccountStack} options={{ headerShown: false }} />
                ) : (
                  <Stack.Screen name="UnauthedStack" component={UnauthedStack} options={{ headerShown: false }} />
                )
            ) : (
              <Stack.Screen name="AuthedStack" component={AuthedStack} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
        </AuthContextProvider>
      {/* </AuthContext.Provider> */}
    </NavigationContainer>
  );
};
export default App;
