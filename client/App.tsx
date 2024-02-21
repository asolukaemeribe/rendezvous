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
import { AuthContext } from "./AppAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage'
const config = require('./config.json');


// SplashScreen.preventAutoHideAsync();

const Tabs = AnimatedTabBarNavigator();

// const AuthContext = React.createContext();

// export const AuthContext = React.createContext();
export const storeUserIDAsync = async (value) => {
  try {
    await AsyncStorage.setItem('userID', value);
  } catch (e) {
    // saving error
  }
};

export const getUserIDAsync = async () => {
  try {
    const value = await AsyncStorage.getItem('userID');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

function AuthedStack({ uid }) {
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="AuthedTabs" options={{ headerShown: false }}>
              {(props) => <AuthedTabs {...props} uid={uid} />}
            </Stack.Screen>
            <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }} initialParams={{userID: uid}}/>
              {/* {(props) => <MessagePage {...props} uid={uid}/>} */}
            {/* </Stack.Screen> */}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  )
}

function AuthedTabs({ uid }) {
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
        // initialParams={{userIsSelf: false}}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault();
            navigation.navigate('ProfilePage', { userIsSelf: true, selfUserID: uid });
          },
        })}
        initialParams={{ userIsSelf: true, userID: uid, selfUserID: uid }}
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
        initialParams={{ userID: uid }}
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
        initialParams={{ userID: uid }}
      />
    </Tabs.Navigator>
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
            // initialParams={{userID: uid}}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ headerShown: false }}
            // initialParams={{userID: uid}}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  )
}

function CreatingAccountStack({ uid }) {
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName="ProfileCreation" screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="ProfileCreation"
              component={ProfileCreation}
              options={{ headerShown: false }}
              initialParams={{ userID: uid }}
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
              initialParams={{ userID: uid }}
            />
            <Stack.Screen
              name="PictureSelection"
              component={PictureSelection}
              options={{ headerShown: false }}
              initialParams={{ userID: uid }}
            />
            <Stack.Screen
              name="AddUserInfoPage"
              component={AddUserInfo}
              options={{ headerShown: false }}
              initialParams={{ userID: uid }}
            />
            <Stack.Screen
              name="DatePreferencesPage"
              component={DatePreferencesPage}
              options={{ headerShown: false }}
              initialParams={{ userID: uid }}
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
        console.log("restore");
        return {
          ...prevAuthState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        console.log("sign in");
        return {
          ...prevAuthState,
          isSignout: false,
          userToken: action.token,
          creatingAccountData: null,
          creatingAccount: false,
        };
      case 'SIGN_OUT':
        console.log("sign out");
        return {
          ...prevAuthState,
          isSignout: true,
          userToken: null,
          creatingAccount: false,
          creatingAccountData: null
        };
      case 'CREATING_ACCOUNT':
        console.log("creatingacc");
        return {
          ...prevAuthState,
          creatingAccount: true
        }
      case 'CREATING_ACCOUNT_DATA':
        console.log(" creating account data now with " + action.accountData)
        return {
          ...prevAuthState,
          creatingAccount: true,
          creatingAccountData: action.accountData,
        }
      default:
        console.log("default")
        return prevAuthState;
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
        storeUserIDAsync(user.uid);
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
  const [authState, setAuthState] = React.useReducer(authReducer, initialAuthState);
  React.useEffect(() => {
    console.log('userToken: ', authState.userToken);
    console.log('isAuth: ', authState.isSignout);
    console.log("creatingAccountData: ", authState.creatingAccountData);
  }, [authState]);
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
          console.log("curr user idea is ", user.uid);
          storeUserIDAsync(user.uid);
          console.log("sign in user ID: ", await getUserIDAsync());
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
          storeUserIDAsync("");

          // alert("Success!");
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
        // try {
        //   console.log("(" + authState.creatingAccountData.email + ")");
        //   console.log(authState.creatingAccountData.password);
        //   const response = await createUserWithEmailAndPassword(
        //     authState.creatingAccountData.auth,
        //     authState.creatingAccountData.email,
        //     authState.creatingAccountData.password
        //   );
        //   console.log(response);
        //   alert("Success!");
        //   const user = authState.creatingAccountData.auth.currentUser;
        console.log("signing up and in user " + await getUserIDAsync());
        setAuthState({ type: 'SIGN_IN', token: await getUserIDAsync() });
        // } catch (error: any) {
        //   console.log(error);
        //   alert("Sign Up Failed: " + error.message);
        // } finally {
        //   // setLoading(false);
        // }
      },
      creatingAccount: async () => {
        setAuthState({ type: 'CREATING_ACCOUNT' })
      },
      setCreatingAccountData: async (auth, email, password) => {
        try {
          console.log("(" + email + ")");
          console.log(password);
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(response);
          // alert("Success!");
          const user = auth.currentUser;
          console.log("user.uid is " + user.uid);
          setAuthState({ type: 'CREATING_ACCOUNT_DATA', accountData: user.uid })
          // console.log("test: " + authState.creatingAccountData.uid);
          storeUserIDAsync(user.uid);
          console.log("test storeUserId" + await getUserIDAsync());
        } catch (error: any) {
          console.log(error);
          alert("Sign Up Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
        // setAuthState({ type: 'CREATING_ACCOUNT_DATA', creatingAccountData: data})
      },
      getCreatingAccountData: async () => {
        // console.log(authState.creatingAccountData);
        return await getUserIDAsync();
      },
      getUserID: async () => {
        return await getUserIDAsync();
        // return authState.userToken;
      }
    }),
    []
  );

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
        (authState.creatingAccount ? <CreatingAccountStack uid={authState.creatingAccountData} /> : <UnauthedStack />) :
        (<AuthedStack uid={authState.userToken} />)}
    </AuthContext.Provider>
  );
};
export default App;
