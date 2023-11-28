import { SafeAreaView, View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, StatusBar, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { connectToDynamoDB } from '../api/aws';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import * as Location from 'expo-location';
import { useCallback } from 'react';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import colors from '../assets/colors/colors';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import Layout from './_layout';
import { Slot, Stack } from 'expo-router';


const Login = () => {
  // states for handling login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>();
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location.coords);
    })();
  }, []);

  // do things based on whether user is signed in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("User is signed in with user id: " + uid);
      connectToDynamoDB();
      // ...
    } else {
      // User is signed out
      console.log("User is signed out. ;)");
      // ...
    }
  });

  const logInTemp = async () => {
    router.replace("/profileCreation");
  };

  const logIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      router.replace("/profileCreation");
      // alert('Logged In!');
    } catch (error: any) {
      console.log(error);
      alert("Sign In Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      console.log("(" + email + ")");
      console.log(password);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Success!");
    } catch (error: any) {
      console.log(error);
      alert("Sign Up Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      const response = await signOut(auth);
      console.log(response);
      alert("Success!");
    } catch (error: any) {
      console.log(error);
      alert("Log out Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const [assets, error] = useAssets([require("../assets/images/logo_2x.png")]);
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/NunitoSans_10pt-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginTop: -insets.top },
        { marginBottom: -insets.bottom },
      ]}
      onLayout={onLayoutRootView}
    >
      {/* <View style={styles.view}> */}
      <Stack.Screen />
      <LinearGradient
        colors={[colors.red, colors.pink]}
        style={styles.background}
      >
        <View
          style={[
            styles.logoWrapper,
            { paddingTop: insets.top * 0.5 },
            { paddingBottom: insets.bottom * 0.5},
          ]}
        >
          <Image
            style={styles.logo}
            source={require("../assets/images/logo_2x.png")}
          />
          <View style={styles.logoTextWrapper}>
            <Text style={styles.logoText}>rendezvous</Text>
          </View>
        </View>
        <View style={styles.loginWrapper}>
          <KeyboardAvoidingView>
            <TextInput
              value={email}
              style={[styles.loginInput, styles.loginInputUsername]}
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={colors.white_55}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              value={password}
              secureTextEntry={true}
              style={[styles.loginInput, styles.loginInputPassword]}
              placeholder="Password"
              placeholderTextColor={colors.white_55}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <View style={styles.loginForgotPasswordWrapper}>
              <Text style={styles.loginForgotPassword}>
                Forgot Password/Username?
              </Text>
            </View>
            {/*TODO: replace with logIn() once design finished*/}
            <Pressable style={styles.loginButton} onPress={() => logInTemp()}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <View style={styles.signUpWrapper}>
              <Text style={styles.signUpWrapperTextContainer}>
                <Text style={styles.signUpWrapperTextFirst}>
                  Don't have an account?{" "}
                </Text>
                <Text style={styles.signUpWrapperTextSecond}>Sign up here</Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
        <Image
          style={styles.cityImage}
          source={require("../assets/images/city.png")}
        ></Image>
      </LinearGradient>
      {/* </View> */}
    </SafeAreaView>
  );
};

registerRootComponent(Login);

export default Login;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: colors.red,
  },
  background: {
    // flex: 1,
  },
  logoWrapper: {
    marginBottom: 10,
    marginTop: 45,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 15.09,
    // width: 238,
    // height: 233
  },
  logoTextWrapper: {

  },
  logoText: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "Nunito-Medium",
    color: colors.white,
  },
  loginWrapper: {
    // flex: 1,
    marginHorizontal: 74,
  },
  loginInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.white_55,
    backgroundColor: colors.white_20,
    textAlign: "center",
    color: colors.white_55,
  },
  loginInputUsername: {
    marginBottom: 23,
  },
  loginInputPassword: {
    marginBottom: 16,
  },
  loginForgotPasswordWrapper: {
    alignItems: "flex-end",
  },
  loginForgotPassword: {
    marginBottom: 32,
    color: colors.white,
    fontFamily: "Roboto-Regular",
  },
  loginButton: {
    backgroundColor: colors.blue,
    // width: '100%',
    height: 45,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    // gap: 10
  },
  loginButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    color: colors.white,
  },
  signUpWrapper: {
    padding: 10,
  },
  signUpWrapperTextContainer: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
  signUpWrapperTextFirst: {
    color: colors.white,
  },
  signUpWrapperTextSecond: {
    color: colors.blue,
  },
  cityImage: {
    alignSelf: "center",
    marginTop: -39
  },


});

// const Stack = createNativeStackNavigator();
// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import IPhone13141 from "../screens/IPhone13141";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text, Pressable, TouchableOpacity } from "react-native";

// const App = () => {
//   const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

//   const [fontsLoaded, error] = useFonts({
//     "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
//   });

//   if (!fontsLoaded && !error) {
//     return null;
//   }

//   return (
//     <>
//       <NavigationContainer>
//         {hideSplashScreen ? (
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen
//               name="IPhone13141"
//               component={IPhone13141}
//               options={{ headerShown: false }}
//             />
//           </Stack.Navigator>
//         ) : null}
//       </NavigationContainer>
//     </>
//   );
// };
// export default App;