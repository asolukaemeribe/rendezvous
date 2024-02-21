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
import { TextInputMask } from "react-native-masked-text"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagePage from "./messagePage";
import dayjs from "dayjs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../AppAuthContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useEffect, useState } from "react";

const config = require('../config.json');
const Stack = createNativeStackNavigator();

const MatchesListPage = ({ route, navigation }) => {
  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;
  const { signOut, getUserID } = React.useContext(AuthContext)
  // const userID = getUserID();
  const userID = route.params.userID;
  console.log("Matches list userID " + userID);
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

    const [matchesData, setMatchesData] = useState([{id: "", first_name: "", last_name: ""}])

    useEffect(() => {
        const userID = route.params.userID;
        console.log("Should fetch all matches now.")
      
        fetch(`http://${config.server_host}:${config.server_port}/getmatches/${userID}`)
        .then(res => res.json())
        .then(resJson => {
          console.log("MATCHES resJson: ")
          console.log(resJson)
          setMatchesData(resJson);  
        });
    }, []);


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
      navigation.push("MessagePage", { receivingUserID: item.id, userID: userID })
    }

    // TODO: Matches page makeover
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
            <Text style={styles.nearbyUsersListItemText}>{item.first_name}</Text>
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
    // signOut(auth).then(() => {
    //   // Sign-out successful.
    //       navigation.navigate("Login");
    //       console.log("Signed out successfully")
    //   }).catch((error) => {
    //   // An error happened.
    //   });
    signOut(auth);

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
      id: "boonloo21",
      first_name: "Luka",
      last_name: "Loo",
      pronouns: "he/him",
      age: "22"
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
              <Text style={styles.creationHeaderText}>Matches</Text>
            </View>
          {/* <ScrollView contentContainerStyle={{ paddingTop: 5 }}> */}

            {/* <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Display Name</Text>
            </View> */}

                <View style={styles.nearbyUsersFirstWrapper}>
                <FlatList
                  data={matchesData}
                  renderItem={({ item }) =>
                    renderButtonItem(item)
                  }
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.nearbyUsersViewWrapper}
                />
                </View>

          {/* </ScrollView> */}
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};


const MatchesListStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MatchesList" component={ MatchesListPage }/>
      <Stack.Screen name="MessagePage" component={ MessagePage }/>
    </Stack.Navigator>
  )
}

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
    // flexDirection: "row"
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
    borderRadius: 50,
    height: 100, 
    width: 100,
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
    height: 100,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    overflow: 'hidden',
    borderRadius: 50,  
    
  },
  nearbyUsersListPhotoImageStyle: {

  },
  topNavigationBarSignOut: {
    alignSelf: "flex-start",
  }
});

export default MatchesListPage;
