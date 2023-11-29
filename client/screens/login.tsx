import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontFamily, Color, Border, Padding, FontSize } from "../GlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { connectToDynamoDB } from "../api/aws";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import * as Location from "expo-location";
import { useCallback } from "react";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset, useAssets } from "expo-asset";
import { useEffect, useState } from "react";

const IPhone13141 = () => {
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

  // const logInTemp = async () => {
  //   navigation.navigate("IPhone13145");
  // };

  // const signUpTemp = async () => {
  //   router.replace("/IPhone13144");
  // };

  const logIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate("IPhone13145");
      // router.replace("/profileCreation");
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

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <LinearGradient
      style={styles.iphone13141}
      locations={[0, 1]}
      colors={["#ff0000", "#db17a4"]}
    >
      <TouchableOpacity
        style={styles.dontHaveAnAccountSignUpWrapper}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("IPhone13144")}
      >
        <Text style={[styles.dontHaveAnContainer, styles.loginTypo]}>
          <Text style={styles.dontHaveAn}>{`Don't have an account? `}</Text>
          <Text style={styles.signUpHere}>Sign up here</Text>
        </Text>
      </TouchableOpacity>
      <Image
        style={[styles.image2Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
      <Pressable
        style={[styles.loginWrapper, styles.frameIcon1Layout]}
        onPress={() => logIn()}
      >
        <Text style={[styles.login, styles.loginTypo]}>Login</Text>
      </Pressable>
      <Image
        style={[styles.frameIcon, styles.framePosition1]}
        contentFit="cover"
        source={require("../assets/frame.png")}
      />
      <View style={[styles.frame, styles.framePosition]}>
        <TextInput
          style={[styles.usernameWrapper, styles.wrapperLayout]}
          placeholder="Username"
          placeholderTextColor={Color.colorGray_100}
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <Image
          style={[styles.frameIcon1, styles.frameIcon1Layout]}
          contentFit="cover"
          source={require("../assets/group-5.png")}
        />
      </View>
      <View style={[styles.frame1, styles.framePosition1]}>
        <Text style={[styles.forgotPasswordusername, styles.usernameTypo]}>
          Forgot password/username?
        </Text>
      </View>
      <View style={[styles.frame2, styles.framePosition]}>
        <TextInput
          style={[styles.passwordWrapper, styles.wrapperLayout]}
          placeholder="Password"
          placeholderTextColor={Color.colorGray_100}
          secureTextEntry={true}
          value={password} 
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <Image
          style={[styles.frameIcon1, styles.frameIcon1Layout]}
          contentFit="cover"
          source={require("../assets/group-6.png")}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loginTypo: {
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    lineHeight: 20,
  },
  iconPosition: {
    left: 0,
    overflow: "hidden",
  },
  frameIcon1Layout: {
    height: 45,
    position: "absolute",
  },
  framePosition1: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  framePosition: {
    marginLeft: -130,
    height: 45,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  wrapperLayout: {
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_200,
    marginTop: -22.5,
    height: 45,
    width: 249,
    borderRadius: Border.br_3xs,
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  usernameTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 20,
  },
  dontHaveAn: {
    color: Color.colorWhite,
  },
  signUpHere: {
    color: Color.colorBlue,
  },
  dontHaveAnContainer: {
    width: 226,
    fontSize: FontSize.size_xs,
  },
  dontHaveAnAccountSignUpWrapper: {
    marginTop: 226,
    marginLeft: -100,
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  image2Icon: {
    right: -12,
    bottom: -70,
    maxWidth: "100%",
    height: 257,
    position: "absolute",
    left: 0,
  },
  login: {
    fontSize: FontSize.size_5xl * 0.8,
    color: Color.colorWhite,
  },
  loginWrapper: {
    marginTop: 150,
    backgroundColor: Color.colorBlue,
    width: 249,
    borderRadius: Border.br_3xs,
    height: 55,
    marginLeft: -118,
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    top: "50%",
  },
  frameIcon: {
    marginTop: -351,
    marginLeft: -116,
    width: 240,
    height: 293,
  },
  username: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_100,
  },
  usernameWrapper: {
    marginLeft: -118,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_200,
    marginTop: -22.5,
    textAlign: "center",
    color: Color.colorWhite,
  },
  frameIcon1: {
    top: 0,
    width: 45,
    left: 0,
    overflow: "hidden",
  },
  frame: {
    marginTop: -19,
    width: 260,
  },
  forgotPasswordusername: {
    marginTop: -10,
    marginLeft: -29,
    color: Color.colorWhite,
    fontSize: FontSize.size_xs,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frame1: {
    marginTop: 110,
    marginLeft: -123,
    width: 252,
    height: 20,
    overflow: "hidden",
  },
  passwordWrapper: {
    marginLeft: -118.5,
    textAlign: "center",
    color: Color.colorWhite,
  },
  frame2: {
    marginTop: 49,
    width: 261,
    overflow: "hidden",
  },
  iphone13141: {
    flex: 1,
    width: "100%",
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default IPhone13141;
