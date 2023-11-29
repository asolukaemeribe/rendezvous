import * as React from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
} from "react-native";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Padding, FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import profilePreferenceData from "../assets/data/profilePreferenceData";
import Octicons from "react-native-vector-icons/Octicons";
import padding from "../assets/global_styles/padding";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import colors from "../assets/global_styles/color";

const ProfilePage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;

  const profileData = {
    first_name: "Boon",
    last_name: "Loo",
    about_me: "If you love Computer Science, then you will love me!",
    pronouns: "he/him",
    gender: "Male",
    age: "21",
    school: "University of Pennsylvania",
    looking_for: "Looking for long term"
  };

  const logOut = async () => {
    // ---- Firebase Sign Out ---- 
    signOut(auth).then(() => {
      // Sign-out successful.
          navigation.navigate("Login");
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened.
      });
  }

  return (
    <View style={styles.profilePageView}>
      <StatusBar style="auto" />
      <LinearGradient
        style={styles.profilePageGradient}
        locations={[0, 0.9]}
        colors={["#ff0000", "#db17a4"]}
      >
        <View
          style={[styles.safeAreaPadding, { marginTop: insets.top }]}
        ></View>
        {/* TODO: replace this with a proper navigation bar */}
        <View style={styles.topNavigationBarWrapper}>
          <Pressable onPress={() => logOut()}>
            <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
          </Pressable>
          <Text style={styles.profilePageLogo}>Rendezvous</Text>
          <View style={{width: 29}}></View>
        </View>
        <View style={styles.profilePhotoWrapper}>
          <Image
            style={styles.profilePhoto}
            source={require("../assets/images/profilePhotoLow.png")}
          />
        </View>
        <View style={styles.profileDataWrapper}>
          <View style={styles.profileDataTextWrapper}>
            <View style={styles.profileDataNamePronounWrapper}>
              <Text style={styles.profileDataName}>{profileData.first_name} {profileData.last_name} </Text>
              <Text style={styles.profilePronounsText}> {profileData.pronouns} </Text>
            </View>
            <View style={styles.profileDataAgeSchoolWrapper}>
              <Text style={styles.profileDataAge}>{profileData.age}{" | "}</Text>
              <Text style={styles.profileDataSchool}>
                {profileData.school}
              </Text>
            </View>
          </View>
          {/* <View style={styles.profileDataImageWrapper}>
            <Image
              style={styles.profileDataImage}
              source={require("../assets/images/maleSymbol.png")}
            />
          </View> */}
        </View>
        <View style={styles.profilePreferencesWrapper}>
          <View style={styles.profilePreferencesDescriptionWrapper}>
            <Image
              style={styles.profileDataImage}
              source={require("../assets/images/handWave.png")}
            />
            <Text style={styles.profilePreferencesDescriptionText}>
              {profileData.about_me}
            </Text>
          </View>
          <View style={styles.profilePreferencesLookingForWrapper}>
            <Image
              style={styles.profileDataImage}
              source={require("../assets/images/search.png")}
            />
            <Text style={styles.profilePreferencesLookingForText}>
              {profileData.looking_for}
            </Text>
          </View>
          <View style={styles.profilePreferencesInterestsWrapper}>
            <View style={styles.profilePreferencesInterestsTitleWrapper}>
              <Text style={styles.profilePreferencesInterestsTitleText}>
                Interests
              </Text>
            </View>
            <View style={styles.profilePreferencesInterestsListWrapper}>
              {/* <ProfileTypesList profilePreferenceData={profilePreferenceData} />; */}
              <Text style={styles.profilePreferencesInterestsListItem}>
                • Teaching
              </Text>
              <Text style={styles.profilePreferencesInterestsListItem}>
                • Technology
              </Text>
              <Text style={styles.profilePreferencesInterestsListItem}>
                • Fun
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePageView: {
    flex: 1,
    // height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
  profilePageGradient: {
    flex: 1,
    // height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
  safeAreaPadding: {},
  profilePageLogo: {
    fontFamily: FontFamily.robotoBold,
    fontSize: 23,
    color: Color.colorWhite,
    // textAlign: "center",
    // alignSelf: "center",
  },
  topNavigationBarWrapper: {
    // height: 44,
    // width: "100%",
    // backgroundColor: Color.colorTransparent,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // alignItems: "center",
    paddingHorizontal: padding.sm,
    marginBottom: 10,
  },
  topNavigationBarSignOut: {
    // position: "absolute",
    // left: 17,
    // top: 17,
    alignSelf: "flex-start",
  },
  profilePhotoWrapper: {
    // borderWidth: 1,
    // borderColor: '#000000',
    height: 375,
  },
  profilePhoto: {
    // height: "100%"
    flex: 1,
    width: "100%",
    // height: "100%",
    height: "100%",
    // aspectRatio: 1,
    // resizeMode: "contain"
  },
  profileDataWrapper: {
    height: 85,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorWhite,
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profileDataTextWrapper: {},
  profileDataName: {
    color: Color.colorWhite,
    fontSize: 27,
  },
  profileDataAgeSchoolWrapper: {
    flexDirection: "row",
  },
  profileDataAge: {
    color: Color.colorWhite,
    fontSize: 22,
  },
  profileDataSchool: {
    color: Color.colorWhite,
    fontSize: 22,
  },
  profileDataImageWrapper: {},
  profileDataImage: {},
  profilePreferencesWrapper: {
    height: 375,
  },
  profilePreferencesDescriptionWrapper: {
    height: 57,
    paddingHorizontal: 17,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePreferencesDescriptionText: {
    color: Color.colorWhite,
    fontSize: 18,
    marginLeft: 10,
    flexShrink: 1,
  },
  profilePreferencesLookingForWrapper: {
    height: 57,
    paddingHorizontal: 17,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePreferencesLookingForText: {
    color: Color.colorWhite,
    fontSize: 18,
    marginLeft: 10,
    flexShrink: 1,
  },
  profilePreferencesInterestsWrapper: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    flexDirection: "column",
  },
  profilePreferencesInterestsTitleWrapper: {
    height: 30,
  },
  profilePreferencesInterestsTitleText: {
    color: Color.colorWhite,
    fontSize: 20,
    fontFamily: FontFamily.robotoBold,
  },
  profilePreferencesInterestsListWrapper: {
    paddingHorizontal: 8,
    flexDirection: "column",
  },
  profilePreferencesInterestsList: {},
  profilePreferencesInterestsListItem: {
    color: Color.colorWhite,
    fontSize: 18,
    marginBottom: 2,
  },
  profileDataNamePronounWrapper: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  profilePronounsText: {
    color: colors.white_75,
    fontSize: 18,
  }
});

export default ProfilePage;