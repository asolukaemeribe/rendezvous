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
import PeopleNearby from "./screens/peopleNearby";
import UserInterestsPage from "./screens/userInterests";
import MessagePage from "./screens/messagePage";
import MatchesListPage from "./screens/matchesListPage"
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";
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
import { AuthContext } from "./AppAuthContext";
const config = require('./config.json');


// SplashScreen.preventAutoHideAsync();

const Tabs = AnimatedTabBarNavigator();
// const AuthContext = React.createContext();

function AuthedStack() {
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
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
            screenOptions={{ headerShown: false }}
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
              initialParams={{ userID: "abc" }}
            // userID: userID
            />
            <Tabs.Screen
              name="PeopleNearby"
              component={PeopleNearby}
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
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  )
}

function UnauthedStack() {
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  )
}

function CreatingAccountStack() {
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  )
}


const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);


  function authReducer(prevAuthState, action) {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevAuthState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevAuthState,
          isSignout: false,
          userToken: action.token,
          creatingAccountData: null,
          creatingAccount: false,
        };
      case 'SIGN_OUT':
        return {
          ...prevAuthState,
          isSignout: true,
          userToken: null,
          creatingAccount: false,
          creatingAccountData: null
        };
      case 'CREATING_ACCOUNT':
        return {
          ...prevAuthState,
          creatingAccount: true
        }
      case 'CREATING_ACCOUNT_DATA':
        return {
          ...prevAuthState,
          creatingAccount: true,
          creatingAccountData: action.creatingAccountData
        }
    }
  }

  const initialAuthState = {
    isLoading: false,
    isSignout: true,
    userToken: null,
    creatingAccount: false,
    creatingAccountData: null
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // let userToken;
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser;
      // try {
      //   // Restore token stored in `SecureStore` or any other encrypted storage
      //   // userToken = await SecureStore.getItemAsync('userToken');
      // } catch (e) {
      //   // Restoring token failed
      // }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (user) {
        setAuthState({ type: 'RESTORE_TOKEN', token: user.uid });
        console.log("App.tsx Application has started. User is signed in so navigating to profile page of user with uid: " + user.uid)
        // navigation.navigate("ProfilePage", {userID: uid});
      }
      else {
        console.log("Application has started; no user is signed in.")
      }
      // else {
      //   setAuthState({ type: 'SIGN_OUT' });
      //   console.log("Application has started; no user is signed in.")
      // }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (auth, email, password, location) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          console.log(response);
          const user = auth.currentUser;

          // update location in postgresql db
          fetch(`http://${config.server_host}:${config.server_port}/updateuserlocation?uid=${user.uid}` +
            `&lat=${location.coords.latitude}&long=${location.coords.longitude}`)
            .then(res => { console.log("success! check database. Location should be updated.") })
            setAuthState({ type: 'SIGN_IN', token: user.uid });

          // navigation.navigate("ProfilePage", {userID: user.uid});
          // router.replace("/profileCreation");
          // alert('Logged In!');
        } catch (error: any) {
          console.log(error);
          alert("Sign In Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
      },
      signOut: async (auth) => {
        // setLoading(true);
        try {
          const response = await signOut(auth);
          console.log(response);
          alert("Success!");
        } catch (error: any) {
          console.log(error);
          alert("Log out Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
        setAuthState({ type: 'SIGN_OUT' });
      },
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        // setLoading(true);
        try {
          console.log("(" + authState.creatingAccountData.email + ")");
          console.log(authState.creatingAccountData.password);
          const response = await createUserWithEmailAndPassword(
            authState.creatingAccountData.auth,
            authState.creatingAccountData.email,
            authState.creatingAccountData.password
          );
          console.log(response);
          alert("Success!");
          const user = authState.creatingAccountData.auth.currentUser;
          setAuthState({ type: 'SIGN_IN', token: user.uid });
        } catch (error: any) {
          console.log(error);
          alert("Sign Up Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
      },
      creatingAccount: async () => {
        setAuthState({ type: 'CREATING_ACCOUNT'})
      },
      setCreatingAccountData: async(data) => {
        setAuthState({ type: 'CREATING_ACCOUNT_DATA', creatingAccountData: data})
      },
      getCreatingAccountData: () => {
        return authState.creatingAccountData;
      }
    }),
    []
  );

  const [authState, setAuthState] = React.useReducer(authReducer, initialAuthState);
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

  return (
    <AuthContext.Provider value={authContext}>
      {(authState.userToken == null) ? 
                                     (authState.creatingAccount ? <CreatingAccountStack /> : <UnauthedStack />) : 
                                     (<AuthedStack />)}
    </AuthContext.Provider>
  );
};
export default App;
