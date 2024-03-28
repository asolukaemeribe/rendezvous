import * as React from "react";
import * as Location from "expo-location";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Modal
} from "react-native";
// import { Image } from "expo-image";
import Feather from "react-native-vector-icons/Feather";
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
import { AuthContext } from "../AppAuthContext";
import colors from "../assets/global_styles/color";
import { useEffect, useState } from "react";
import MessagePage from "./messagePage";
const config = require('../config.json');
// import Modal from "react-native-modal";

const ProfilePage = ({ route, navigation }) => {
  // const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { signOut, getUserID } = React.useContext(AuthContext)
  const selfUserID = route.params.selfUserID;
  const userIsSelf = route.params.userIsSelf;
  const profileUserID = route.params.userID;
  console.log("profile page test userid ", selfUserID);
  console.log("userisself: ", route.params.userIsSelf)
  console.log("profile page uid: ", profileUserID);
  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;
  const [profileData, setProfileData] = useState({
    first_name: "Boon",
    last_name: "Loo",
    about_me: "If you love Computer Science, then you will love me!",
    pronouns: "he/him",
    gender: "Male",
    age: "21",
    image: "",
    school: "University of Pennsylvania",
    looking_for: "Looking for long term"
  })
  const [location, setLocation] = useState<Location.LocationObject>();
  const [modalVisible, setModalVisible] = useState(false);
  const [justMatched, setJustMatched] = useState(false);
  /*const profileData = {
    first_name: "Boon",
    last_name: "Loo",
    about_me: "If you love Computer Science, then you will love me!",
    pronouns: "he/him",
    gender: "Male",
    age: "21",
    school: "University of Pennsylvania",
    looking_for: "Looking for long term"
  };*/

  const suggestedLocationsData = [
    {
      id: "location1",
      location_name: "White Dog Cafe",
      distance: "1.7 mi",
      category: "Restaurant",
      price: 2,
      photo_path: require("../assets/images/white_dog.jpg"),
      common_interest: "American food"
    },
    {
      id: "location2",
      location_name: "Cira Green",
      distance: "2.5 mi",
      category: "Park",
      price: 0,
      photo_path: require("../assets/images/cira_green.jpg"),
      common_interest: "Nature"
    },
    {
      id: "location3",
      location_name: "Dante & Luigi's",
      distance: "4.3 mi",
      category: "Restaurant",
      price: 3,
      photo_path: require("../assets/images/dante_and_luigis.jpg"),
      common_interest: "Italian food"
    },
  ];


  useEffect(() => {
    // get location
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("LOCATION proflePage: ");
      console.log(location.coords)
    })();

    console.log("PROFILE PAGE UID: " + profileUserID) //MATT: moved userID get to beginning of page

    fetch(`http://${config.server_host}:${config.server_port}/user/${profileUserID}`)
      .then(res => res.json())
      .then(resJson => {
        console.log("resJson first name: " + resJson.first_name)
        /*profileData.first_name = resJson.first_name;
        profileData.last_name = resJson.last_name;
        profileData.about_me = resJson.about_me;
        profileData.pronouns = resJson.pronouns;
        profileData.gender = resJson.gender;*/
        //const profile = resJson.map((user) => ({first_name: user.first_name, ...user}))
        setProfileData({
          first_name: resJson.first_name,
          last_name: resJson.last_name,
          about_me: resJson.about_me,
          pronouns: resJson.pronouns,
          gender: resJson.gender,
          image: resJson.image,
          age: resJson.age,
          school: "University of Pennsylvania",
          looking_for: "Looking for long term"
        })
      });
  }, []);


  const logOut = async () => {
    // ---- Firebase Sign Out ---- 
    // signOut(auth).then(() => {
    //   // Sign-out successful.
    //       navigation.navigate("Login");
    //       console.log("Signed out successfully")
    //   }).catch((error) => {
    //   // An error happened.
    //   });
    signOut(auth)
  }

  const viewPotentialMatches = async () => {
    // const { userID } = route.params;
    console.log("should navigate to viewPotentialMatches Page now")
    navigation.navigate("ViewPotentialMatchesPage", {
      userID: profileUserID,
      lat: location.coords.latitude,
      long: location.coords.longitude,
      rad: 16094
    }) // about 10 miles in meters. TODO: make this configureable and make a function to convert from miles to meters
  }

  const viewPeopleNearby = async () => {
    // const { userID } = route.params;
    console.log("should navigate to peopleNearby Page now")
    navigation.navigate("PeopleNearby", {
      userID: profileUserID,
      lat: location.coords.latitude,
      long: location.coords.longitude,
      rad: 16094
    }) // about 10 miles in meters. TODO: make this configureable and make a function to convert from miles to meters
  }

  const matchWithUser = async () => {
    console.log("SELF USER ID: ")
    console.log(selfUserID)
    console.log("OTHER USERS ID: ")
    console.log(profileUserID)

    // send match to database!
    fetch(`http://${config.server_host}:${config.server_port}/newmatch?uid1=${selfUserID}` +
      `&uid2=${profileUserID}`)
      .then(res => { console.log("success! check database") })

    setModalVisible(!modalVisible);
    setJustMatched(true);
    console.log( "modal visible: " + modalVisible);
  }

 // THIS HANDLES RENDERING AND STATE CHANGE OF EACH LOCATION ITEM/BLOCK 
 const renderLocationItem = (item) => {

  function handleButtonPress() {
    // todo: Need to navigate to the chat page with the user
    navigation.push("MessagePage", { receivingUserID: profileUserID, userID: selfUserID,
                                     suggestedLocationName: item.location_name});
    setModalVisible(!modalVisible);
  }


  const source = item.photo_path;

  return (
    <Pressable
      style={[
        styles.suggestedLocationsListItem,
      ]}
      onPress={() => handleButtonPress()}
    >
      <ImageBackground
        style={styles.suggestedLocationsListPhoto}
        imageStyle={styles.suggestedLocationsListPhotoImageStyle}
        source={source}
      >
        <Text style={styles.suggestedLocationsListItemText}>{item.location_name}</Text>
        <Text style={styles.suggestedLocationsListItemInterestText}>You both like {item.common_interest}</Text>
        <Text style={styles.suggestedLocationsListItemDistanceText}>{item.distance}  {Array(item.price).fill('$').join('')}</Text>
        <Text style={styles.suggestedLocationsListItemCategoryText}>{item.category}</Text>
      </ImageBackground>
    </Pressable>
  );
};



  return (
    <View style={styles.profilePageView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredModalView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You matched!</Text>
            <Text style={styles.modalDateText}>Pick a personalized date:</Text>
            <View style={styles.suggestedLocationsWrapper}>
                  <FlatList
                    data={suggestedLocationsData}
                    renderItem={({ item }) =>
                      renderLocationItem(item)
                    }
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                  />
              </View>
            <Pressable
              style={styles.modalButtonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalButtonTextStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
          {/* <Pressable onPress={() => logOut()}>
            <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
          </Pressable> */}
          {route.params.userIsSelf ?
            (<Pressable onPress={() => logOut()}>
              <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
            </Pressable>) :
            (<Pressable onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={32} color="white" />
            </Pressable>)
          }
          <Text style={styles.profilePageLogo}>Rendezvous</Text>
          <View style={{ width: 29 }}></View>
        </View>
        <ScrollView>
          <View style={styles.profilePhotoWrapper}>
            <ImageBackground
              style={styles.profilePhoto}
              source={require("../assets/images/defaultProfilePic.png")}
            >
              <View style={styles.matchButtonWrapper}>
                {(route.params.userIsSelf || justMatched ) ? (<View />) :
                  (<Pressable style={styles.matchButton} onPress={() => matchWithUser()}>
                    <Text style={styles.matchButtonText}>Send Match</Text>
                  </Pressable>)
                }
              </View>
            </ImageBackground>
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
                //source={require("../assets/images/handWave.png")}
                source={{ uri: profileData.image }}
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
        </ScrollView>
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
    height: 300,
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
    flex: 2
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
  },
  profilePreferencesInterestsMatchWrapper: {
    flexDirection: "row",
    height: 100
  },
  matchButtonWrapper: {
    flex: 1,
    height: 20,
    paddingHorizontal: padding.xs + padding.xxs,
    paddingVertical: 5,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  matchButton: {
    backgroundColor: Color.colorWhite_2,
    height: 35,
    width: 83,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 0,
  },
  matchButtonText: {
    fontSize: 12,
    color: Color.colorBlack,
    fontWeight: "600",
  },
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
    // paddingBottom: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_600,
    fontSize: 20,
    textAlign: 'center',
  },
  modalButtonClose: {
    backgroundColor: "#db17a4",
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 25,
    elevation: 2,
  },
  modalButtonTextStyle: {
    color: 'white',
    fontFamily: FontFamily.interMedium,
    fontSize: 14,
    textAlign: 'center',
  },
  modalDateText: {
    marginBottom: 15,
    fontFamily: FontFamily.interMedium,
    color: Color.colorGray_600,
    fontSize: 15,
    textAlign: 'center',
  },
  suggestedLocationsWrapper: {
    // width: 250,
    height: 500,
    // padding: 10,
    // backgroundColor: Color.colorBlue,
  },
  suggestedLocationsListItem: {
    borderRadius: 10,
    height: 150,
    width: 290,
    backgroundColor: Color.colorBlack,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10
  },
  suggestedLocationsListPhoto: {
    height: 150,
    width: 290,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  suggestedLocationsListPhotoImageStyle: {
    opacity: 0.6
  },
  suggestedLocationsListItemText: {
    fontSize: 19,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.white,
    marginBottom: 3,
  },
  suggestedLocationsListItemDistanceText: {
    fontSize: 11,
    fontFamily: FontFamily.interMedium,
    fontWeight: "900",
    color: colors.white,
  },
  suggestedLocationsListItemCategoryText: {
    fontSize: 11,
    fontFamily: FontFamily.interMedium,
    fontWeight: "900",
    color: colors.white,
  },
  suggestedLocationsListItemInterestText: {
    fontSize: 12,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.white,
  },
});

export default ProfilePage;
