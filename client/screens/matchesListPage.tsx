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
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Padding, FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import profilePreferenceData from "../assets/data/profilePreferenceData";
import Feather from "react-native-vector-icons/Feather";
import padding from "../assets/global_styles/padding";
import colors from "../assets/global_styles/color";
import profileInfoData from "../assets/data/profileInfoData";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInputMask } from "react-native-masked-text";
import dayjs from "dayjs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useEffect, useState } from "react";

const config = require('../config.json');

const PeopleNearby = ({ route, navigation }) => {
  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;

  const [orientationTypesArray, setOrientationTypesArray] =
    React.useState(
      Object.entries(
        profileInfoData.find((item) => item.category === "Sexual Orientation")
          .types
      ).map(([key, value]) => ({
        id: key,
        isSelected: value,
      }))
    );

    // const [nearbyUsersData, setNearbyUsersData] = useState([{id: ""}])

    // useEffect(() => {
    //     const { userID, lat, long, rad } = route.params;
    //     console.log("POT MATCHES PAGE UID: " + userID)
    //     console.log("POT MATCHES PAGE LAT: " + lat)
    //     console.log("POT MATCHES PAGE LONG: " + long)
    //     console.log("POT MATCHES PAGE RAD: " + rad)
    
    //     fetch(`http://${config.server_host}:${config.server_port}/getusersinradius?uid=${userID}&lat=${lat}&long=${long}&rad=${rad}`)
    //     .then(res => res.json())
    //     .then(resJson => {
    //       console.log("POT MATCHES PAGE resJson: ")
    //       console.log(resJson)
    //       setNearbyUsersData(resJson);  
    //     });
    // }, []);


  const renderButtonItem = (item) => {
    // const handleButtonPress = () => {
    //   const index = array.findIndex((type) => type.id === item.id);

    //   // TODO: This can be used when multiple can be selected at once
    //   // setGenderTypesArray((prevArray) => {
    //   //   const newArray = [...prevArray];
    //   //   newArray[index].isSelected = !newArray[index].isSelected;
    //   //   return newArray;
    //   // });
    //   setArrayFunction((prevArray) => {
    //     const newArray = prevArray.map((item) => ({
    //       ...item,
    //       isSelected: false,
    //     }));

    //     newArray[index].isSelected = true;

    //     return newArray;
    //   });
    // };

    const handleButtonPress = () => {
      navigation.push("ProfilePage", {userID: item.id})
    }

    return (
      <Pressable
        style={[
          styles.nearbyUsersListItem,
        ]}
        onPress={() => handleButtonPress()}
      >
          <ImageBackground
            style={styles.nearbyUsersListPhoto}
            imageStyle={styles.nearbyUsersListPhotoImageStyle}
            source={require("../assets/images/profilePhoto.png")}
          > 
            <Text style={styles.nearbyUsersListItemText}>{item.first_name} {item.last_name}, {item.age}</Text>
          </ImageBackground>
      </Pressable>
    );
  };

  const getSelected = (array) => {
    const selected = array.find((item) => item.isSelected);
    return selected ? selected.id : "";
  }

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
  // TODO: Don't allow user to navigate back to home page from here

  const profilesList = [
    {
      id: "boonloo1",
      first_name: "Boon",
      last_name: "Loo",
      pronouns: "he/him",
      age: "21"
    },
    {
      id: "boonloo2",
      first_name: "Boon",
      last_name: "Looo",
      pronouns: "he/him",
      age: "22"
    },
    {
      id: "boonloo3",
      first_name: "Boon",
      last_name: "Loooo",
      pronouns: "he/him",
      age: "23"
    },
    {
      id: "boonloo4",
      first_name: "Boon",
      last_name: "Looooo",
      pronouns: "he/him",
      age: "24"
    },
    {
      id: "boonloo5",
      first_name: "Boon",
      last_name: "Loooooo",
      pronouns: "he/him",
      age: "25"
    },
    {
      id: "boonloo6",
      first_name: "Boon",
      last_name: "Looooooo",
      pronouns: "he/him",
      age: "26"
    },
    {
      id: "boonloo7",
      first_name: "Boon",
      last_name: "Loooooooo",
      pronouns: "he/him",
      age: "27"
    },
    {
      id: "boonloo8",
      first_name: "Boon",
      last_name: "Looooooooo",
      pronouns: "he/him",
      age: "28"
    },
    {
      id: "boonloo9",
      first_name: "Boon",
      last_name: "Loooooooooo",
      pronouns: "he/him",
      age: "29"
    },
  ];

  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat);
  const mask = 'MM/DD/YYYY';
  // const isValid = this.datetimeField.isValid()

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
      <View style={styles.pageView}>
        <StatusBar style="light" />
        <LinearGradient
          style={styles.pageGradient}
          locations={[0, 0.9]}
          colors={["#ff0000", "#db17a4"]}
        >
          <View style={[{ paddingTop: insets.top * 0.8 }]} />
          <View style={styles.topMenuWrapper}>
            {/* <Feather name="chevron-left" size={32} color="white" /> */}
          <Pressable onPress={() => logOut()}>
            <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
          </Pressable>
            {/* <View style={styles.topNavigationBarWrapper}>*/}
          {/* <Pressable onPress={() => logOut()}>
            <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
          </Pressable> */}
          {/*<Text style={styles.profilePageLogo}>Rendezvous</Text>
          <View style={{width: 29}}></View>
        </View> */}
          </View>           
           <View style={styles.creationHeaderWrapper}>
              <Text style={styles.creationHeaderText}>People Nearby</Text>
            </View>
          {/* <ScrollView contentContainerStyle={{ paddingTop: 5 }}> */}

            {/* <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Display Name</Text>
            </View> */}
          <ScrollView contentContainerStyle={styles.nearbyUsersViewWrapper}>
                <View style={styles.nearbyUsersFirstWrapper}>
                <FlatList
                  data={profilesList}
                  renderItem={({ item }) =>
                    renderButtonItem(item)
                  }
                  keyExtractor={(item) => item.id}
                />
                </View>
                <View style={styles.nearbyUsersSecondWrapper}>
                <FlatList
                  data={profilesList}
                  renderItem={({ item }) =>
                    renderButtonItem(item)
                  }
                  keyExtractor={(item) => item.id}
                />
                </View>
          </ScrollView>
          {/* </ScrollView> */}
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  pageGradient: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  topMenuWrapper: {
    paddingHorizontal: padding.lg,
    // marginTop: 10,
    height: 60,
    // marginBottom: 22,
    // paddingTop: padding.xxs,
    // paddingBottom: padding.xs,
    justifyContent: "center",
  },
  creationHeaderWrapper: {
    paddingHorizontal: padding.xl,
    height: 55,
    paddingTop: padding.xxs,
  },
  creationHeaderText: {
    fontFamily: FontFamily.interBold,
    fontSize: 30,
    fontWeight: "900",
    color: Color.colorWhite,
  },
  headerText: {
    fontFamily: FontFamily.interBold,
    fontSize: 23,
    fontWeight: "700",
    color: Color.colorWhite,
    alignItems: "center",
  },
  keyboardView: {
    flexGrow: 1,
  },
  buttonsListWrapper: {
    paddingLeft: padding.xl,
    // paddingRight: padding.xs,
    height: 35,
    marginBottom: 15,
  },
  listButtonItem: {
    height: 35,
    width: 85,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listButtonItemUnselected: {
    backgroundColor: colors.white_55,
    borderColor: colors.white_55,
  },
  listButtonItemSelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  listButtonItemText: {
    fontSize: 11,
    textAlign: "center",
    color: colors.white,
  },
  headerWrapper: {
    paddingHorizontal: padding.xl,
    height: 37,
    justifyContent: "flex-start",
  },
  nearbyUsersViewWrapper: {
    paddingHorizontal: padding.xl,
    paddingTop: padding.xxs,
    alignItems: "flex-start",
    flexDirection: "row"
  },
  nearbyUsersFirstWrapper: {
    alignItems: "flex-start",
    flex: 1
  },
  nearbyUsersSecondWrapper: {
    alignItems: "flex-end",
    flex: 1
  },
  nearbyUsersListItem: {
    borderRadius: 10,
    height: 150, 
    width: 150,
    backgroundColor: Color.colorGray_100,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10
  },
  nearbyUsersListItemText: {
    fontSize: 15,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.white,
  },
  nearbyUsersListPhoto: {
    height: 150,
    width: 150,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,  
    
  },
  nearbyUsersListPhotoImageStyle: {

  },
  topNavigationBarSignOut: {
    alignSelf: "flex-start",
  }
});

export default PeopleNearby;
