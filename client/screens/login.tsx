import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useRoute } from "@react-navigation/native";
import { FontFamily, Color, Border, Padding, FontSize } from "../GlobalStyles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { connectToDynamoDB } from "../api/aws";

import * as Location from "expo-location";
import { useCallback } from "react";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset, useAssets } from "expo-asset";
import { useEffect, useState } from "react";
import colors from "../assets/global_styles/color";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import  { AuthContext } from "../AppAuthContext"
const config = require('../config.json');


const Login = () => {
  // states for handling login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>();
  const auth = FIREBASE_AUTH;
  const route = useRoute()
  const { signIn, signOut } = React.useContext(AuthContext)

  // ----MATT: TODO: there is an issue with location not being defined until after i hit buttons sometimes such as login?
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

    // const user = auth.currentUser;
    // if (user) {
    //   const uid = user.uid;
    //   console.log("Application has started. User is signed in so navigating to profile page of user with uid: " + uid)
    //   // navigation.navigate("ProfilePage", {userID: uid});
    // } else {
    //   console.log("Application has started; no user is signed in.")
    // }

  }, []);

  // do things based on whether user is signed in
  /*onAuthStateChanged(auth, (user) => {
    console.log("NAVIGATING AS CURRENT ROUTE NAME IS: "+ route.name)
    if (route.name == "Login") {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        navigation.navigate("ProfilePage", {userID: uid});
        console.log("User is signed in with user id: " + uid);
        //connectToDynamoDB();
        // ...
      } else {
        // User is signed out
        console.log("User is signed out. ;)");
        // ...
      }
    }
  });*/

  const logIn = async () => {
    // setLoading(true);
    signIn(auth, email, password, location)
  };

  const signUp = async () => {
    // setLoading(true);
    // try {
    //   console.log("(" + email + ")");
    //   console.log(password);
    //   const response = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   console.log(response);
    //   alert("Success!");
    // } catch (error: any) {
    //   console.log(error);
    //   alert("Sign Up Failed: " + error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const logOut = async () => {
    // setLoading(true);
    // try {
    //   const response = await signOut(auth);
    //   console.log(response);
    //   alert("Success!");
    // } catch (error: any) {
    //   console.log(error);
    //   alert("Log out Failed: " + error.message);
    // } finally {
    //   setLoading(false);
    // }
    signOut(auth);
  };

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      style={styles.gradientContainer}
      locations={[0, 1]}
      colors={[colors.red, colors.pink]}
      >
        {/* <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}> */}
        <View
          style={[
            styles.logoWrapper,
            { paddingTop: insets.top * 0.5 },
            { paddingBottom: insets.bottom * 0.5},
          ]}
        >
          <Image
            style={styles.logo}
            // style={[styles.image2Icon, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/images/logo_2x.png")}
          />
          <View style={styles.logoTextWrapper}>
            <Text style={styles.logoText}>rendezvous</Text>
          </View>
        </View>
        <View style={styles.loginWrapper}>
          <View style={styles.loginInputWrapper}>
            <View style={styles.inputIconCircle}>
              <Feather name="user" 
              size={28} 
              color={colors.black} 
              style={styles.inputIcon}/>
            </View>
            <TextInput
              value={email}
              style={[styles.loginInput, styles.loginInputUsername]}
              autoCapitalize="none"
              placeholder="email"
              placeholderTextColor={colors.white_55}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View style={styles.loginInputWrapper}>
            <View style={styles.inputIconCircle}>
              <MaterialCommunityIcons name="lock-outline" 
                size={28} 
                color={colors.black} 
                style={styles.inputIcon}/>
            </View>
            <TextInput
              value={password}
              secureTextEntry={true}
              style={[styles.loginInput, styles.loginInputPassword]}
              placeholder="Password"
              placeholderTextColor={colors.white_55}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
            <View style={styles.loginForgotPasswordWrapper}>
              <Text style={styles.loginForgotPassword}>
                Forgot Password/Username?
              </Text>
            </View>
            {/*TODO: replace with logIn() once design finished*/}
            <Pressable style={styles.loginButton} onPress={() => logIn()}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.signUpWrapper} onPress={() => navigation.navigate("CreateAccount")}>
              <Text style={styles.signUpWrapperTextContainer}>
                <Text style={styles.signUpWrapperTextFirst}>
                  Don't have an account?{" "}
                </Text>
                <Text style={styles.signUpWrapperTextSecond}>Sign up here</Text>
                {/* <Link style={styles.signUpWrapperTextSecond} href="/accountCreation">Sign up here</Link> */}
              </Text>
            </Pressable>
        </View>
        <Image
          style={styles.cityImage}
          source={require("../assets/images/city-background.png")}
        ></Image>
        {/* </KeyboardAvoidingView> */}
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    // backgroundColor: colors.red,
  },
  background: {
    // flex: 1,
  },
  logoWrapper: {
    marginBottom: 5,
    marginTop: 50,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 15.09,
    width: 238,
    aspectRatio: 1,
  },
  logoTextWrapper: {

  },
  logoText: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    // fontFamily: FontFamily.robotoBold,
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
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
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
    marginBottom: 12,
  },
  loginForgotPasswordWrapper: {
    alignItems: "flex-end",
  },
  loginForgotPassword: {
    marginBottom: 32,
    color: colors.white,
    fontFamily: FontFamily.robotoMedium,
  },
  loginButton: {
    backgroundColor: colors.blue,
    // width: '100%',
    height: 45,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 37,
    // gap: 10
  },
  loginButtonText: {
    fontFamily: FontFamily.robotoBold,
    fontSize: 24,
    color: colors.white,
  },
  signUpWrapper: {
    padding: 10,
    width: "100%",
    // height: 50,
    // backgroundColor: colors.white_20, // can leave this out later
    zIndex: 1,
    marginBottom: 37
  },
  signUpWrapperTextContainer: {
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontSize: 14,
    fontWeight: "600"
  },
  signUpWrapperTextFirst: {
    color: colors.white,
  },
  signUpWrapperTextSecond: {
    color: colors.blue,
  },
  cityImage: {
    height: 115,
    width: "100%",
  },
  keyboardView: {
    flexGrow: 1,
  },
  loginInputWrapper: {
    // flexDirection: "row",
  },
  inputIconCircle: {
    position: "absolute",
    left: -10,
    // marginLeft: -10,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.white,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputIcon:
  {
    color: colors.black
  }
});

export default Login;
