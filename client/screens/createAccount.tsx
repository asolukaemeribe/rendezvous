import * as React from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Padding, FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";


const CreateAccount = ({ navigation }) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;

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
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        navigation.navigate("ProfileCreation", {userID: uid});
      } else {
        // user is not signed in for some reason
        console.log("user is not signed in")
      }

      
      // alert("Success!");
    } catch (error: any) {
      console.log(error);
      alert("Sign Up Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <KeyboardAvoidingView style={styles.createAccountContainer} behavior="padding">
    <LinearGradient
      style={styles.createAccountContainer}
      locations={[0, 1]}
      colors={["#ff0000", "#db17a4"]}
    >
      <TouchableOpacity
        style={styles.vector}
        activeOpacity={0.2}
      onPress={() => /*navigation.navigate("Login")*/{}}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
      </TouchableOpacity>
      <Text style={styles.createNewAccount}>Create New Account</Text>
      <Pressable
        style={[styles.signUpWrapper, styles.signWrapperFlexBox]}
        onPress={() => signUp()}
      >
        <Text style={[styles.signUp, styles.signUpTypo]}>Sign Up</Text>
      </Pressable>
      <View style={[styles.frame, styles.framePosition]}>
      <TextInput style={[styles.usernameWrapper, styles.signWrapperFlexBox]}     
                placeholder="Username" placeholderTextColor={Color.colorGray_100}>
        </TextInput>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/group-5.png")}
        />
      </View>
      <View style={[styles.frame1, styles.framePosition]}>
      <TextInput style={[styles.usernameWrapper, styles.signWrapperFlexBox]}     
                placeholder="Password" placeholderTextColor={Color.colorGray_100}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text) }>
        </TextInput>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/group-6.png")}
        />
      </View>
      <View style={[styles.frame2, styles.framePosition]}>
      <TextInput style={[styles.usernameWrapper, styles.signWrapperFlexBox]}     
                placeholder="Email" placeholderTextColor={Color.colorGray_100}
                onChangeText={(text) => setEmail(text)}>
        </TextInput>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/group-7.png")}
        />
      </View>
      <View style={[styles.frame3, styles.framePosition]}>
      <TextInput style={[styles.usernameWrapper, styles.signWrapperFlexBox]}     
                placeholder="Phone Number" placeholderTextColor={Color.colorGray_100}>
        </TextInput>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/group-8.png")}
        />
      </View>
      <View
        style={[
          styles.alreadyHaveAnAccountSignWrapper,
          styles.signWrapperFlexBox,
        ]}
      >
        <Text style={[styles.alreadyHaveAnContainer, styles.signUpTypo]}>
          <Text
            style={styles.alreadyHaveAn}
          >{`Already have an account? `}</Text>
          <Text style={styles.signInHere}>Sign in here</Text>
        </Text>
      </View>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signWrapperFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  signUpTypo: {
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "left",
  },
  framePosition: {
    width: 261,
    height: 45,
    left: "50%",
    top: "50%",
    marginLeft: -131,
    position: "absolute",
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  vector: {
    left: 39,
    top: 88,
    width: 25,
    height: 20,
    position: "absolute",
  },
  createNewAccount: {
    marginTop: -261,
    fontSize: 40,
    lineHeight: 50,
    fontFamily: FontFamily.interRegular,
    width: 243,
    height: 117,
    textAlign: "left",
    marginLeft: -131,
    color: Color.colorWhite,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  signUp: {
    fontSize: FontSize.size_5xl * 0.8,
    color: Color.colorWhite,
  },
  signUpWrapper: {
    marginTop: 160,
    marginLeft: -119,
    backgroundColor: Color.colorBlue,
    height: 45,
    width: 249,
    borderRadius: Border.br_3xs,
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    top: "50%",
  },
  username: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.robotoMedium,
    color: Color.colorGray_100,
    lineHeight: 20,
    textAlign: "left",
  },
  usernameWrapper: {
    top: 0,
    left: 12,
    backgroundColor: Color.colorGray_200,
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 0.5,
    height: 45,
    width: 249,
    borderRadius: Border.br_3xs,
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    color: Color.colorGray_100,
  },
  frameChild: {
    width: "17.24%",
    top: "0%",
    right: "82.76%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frame: {
    marginTop: -129,
  },
  frame1: {
    marginTop: -60,
  },
  frame2: {
    marginTop: 8,
  },
  frame3: {
    marginTop: 78,
  },
  alreadyHaveAn: {
    color: Color.colorWhite,
  },
  signInHere: {
    color: Color.colorBlue,
  },
  alreadyHaveAnContainer: {
    fontSize: FontSize.size_xs,
  },
  alreadyHaveAnAccountSignWrapper: {
    marginTop: 220,
    marginLeft: -113,
    left: "50%",
    top: "50%",
  },
  createAccountContainer: {
    flex: 1,
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateAccount;
