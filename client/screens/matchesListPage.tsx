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
import { useNavigation, ParamListBase, useIsFocused } from "@react-navigation/native";
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

  const [matchesData, setMatchesData] = useState([{ id: "", first_name: "", last_name: "" }])
  const isFocused = useIsFocused();

  useEffect(() => {
    const userID = route.params.userID;
    console.log("Should fetch all matches now.")

    if (isFocused) {
      fetch(`http://${config.server_host}:${config.server_port}/getmatches/${userID}`)
        .then(res => res.json())
        .then(resJson => {
          console.log("MATCHES resJson: ")
          console.log(resJson)
          setMatchesData(resJson);
        });
    }
  }, [isFocused]);


  const renderButtonItem = (item) => {
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
          source={require("../assets/images/defaultProfilePicDark.png")}
        >
          <Text style={styles.nearbyUsersListItemText}>{item.first_name}</Text>
        </ImageBackground>
      </Pressable>
    );
  };

  const renderMessagesListItem = (item) => {
    const handleButtonPress = () => {
      navigation.push("MessagePage", { receivingUserID: item.id, userID: userID })
    }

    // TODO: Matches page makeover
    return (
      <Pressable
        style={[
          styles.messagesListItem,
        ]}
        onPress={() => handleButtonPress()}
      >
        <View>
          <ImageBackground
            style={styles.messagesListPhoto}
            imageStyle={styles.messagesListPhotoImageStyle}
            source={require("../assets/images/defaultProfilePicDark.png")}
          >
          </ImageBackground>
        </View>
        <View style={styles.messagesListTextWrapper}>
          <View style={styles.messagesListItemHeadingWrapper}>
            <Text style={styles.messagesListItemName}>{item.first_name}</Text>
            <Text style={styles.messagesListItemTime}>{item.message_time}</Text>
          </View>
          <View style={styles.messagesListChatWrapper}>
            <Text style={styles.messagesListChat}>{item.first_message}</Text>
          </View>
        </View>
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
      age: "21",
      message_time: "2m",
      first_message: "Hey wanna meet up for coffee and coding on Saturday?"
    },
    {
      id: "lukaemeribe21",
      first_name: "Luka",
      last_name: "Emeribe",
      pronouns: "he/him",
      age: "22",
      message_time: "3d",
      first_message: "Let's hoop!"
    },
    {
      id: "mattromage3",
      first_name: "Matt",
      last_name: "Romage",
      pronouns: "he/him",
      age: "21",
      message_time: "5d",
      first_message: "Do you like dogs? I love dogs they are so cute and fluffy, here is a photo of my small dog Matt Jr."
    },
    {
      id: "jasonli21123",
      first_name: "Jason",
      last_name: "Li",
      pronouns: "he/him",
      age: "22",
      message_time: "5d",
      first_message: "Can't wait to rendezvous at Board and Brew on Sunday!"
    },
    {
      id: "craiglee",
      first_name: "Craig",
      last_name: "Lee",
      pronouns: "he/him",
      age: "22",
      message_time: "7d",
      first_message: "Yo"
    },
    {
      id: "venuc",
      first_name: "Venu",
      last_name: "Chillal",
      pronouns: "he/him",
      age: "22",
      message_time: "2w",
      first_message: "I'll sing u a lullaby"
    },
    {
      id: "daisyt",
      first_name: "Daisy",
      last_name: "Teller",
      pronouns: "she/her",
      age: "22",
      message_time: "2w",
      first_message: "What's your favorite flower?"
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
          colors={["#ff0000D6", "#db176AD6"]}
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
        </LinearGradient>
          <ScrollView style={styles.pageContentWrapper}>
          <View style={styles.creationHeaderWrapper}>
            <Text style={styles.creationHeaderText}>Matches</Text>
          </View>
          {/* <ScrollView contentContainerStyle={{ paddingTop: 5 }}> */}

          {/* <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Display Name</Text>
            </View> */}

          <View style={styles.nearbyUsersFirstWrapper}>
            <FlatList
              data={profilesList}
              renderItem={({ item }) =>
                renderButtonItem(item)
              }
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.nearbyUsersViewWrapper}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.messagesListVerticalViewWrapper}>
            <Text style={styles.messagesHeaderText}>Messages</Text>
            <FlatList
              data={profilesList}
              renderItem={({ item }) =>
                renderMessagesListItem(item)
              }
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesListVerticalWrapper}
              scrollEnabled={false}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            />
          </View>
          </ScrollView>

          {/* </ScrollView> */}
      </View>
    </KeyboardAvoidingView>
  );
};


const MatchesListStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MatchesList" component={MatchesListPage} />
      <Stack.Screen name="MessagePage" component={MessagePage} />
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
    // flex: 1,
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
    paddingHorizontal: padding.lg,
    height: 55,
    paddingTop: padding.xxs,
  },
  creationHeaderText: {
    fontFamily: FontFamily.interBold,
    fontSize: 30,
    fontWeight: "900",
    color: Color.colorRed_3,
  },
  headerText: {
    fontFamily: FontFamily.interBold,
    fontSize: 23,
    fontWeight: "700",
    // color: Color.colorWhite,
    color: Color.colorRed,
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
    backgroundColor: colors.black_55,
    borderColor: colors.black_55,
  },
  listButtonItemSelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  listButtonItemText: {
    fontSize: 11,
    textAlign: "center",
    color: colors.black,
  },
  headerWrapper: {
    paddingHorizontal: padding.lg,
    height: 37,
    justifyContent: "flex-start",
  },
  nearbyUsersViewWrapper: {
    paddingHorizontal: padding.lg,
    paddingTop: padding.xxs,
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: padding.md
  },
  nearbyUsersFirstWrapper: {
    alignItems: "flex-start",
    flexDirection: "row",
    // flex: 1
  },
  nearbyUsersListItem: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: Color.colorGray_100,
    marginRight: 5,
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
  },
  messagesListVerticalViewWrapper: {
    paddingHorizontal: padding.lg,
  },
  messagesListVerticalWrapper: {
    paddingBottom: 100
  },
  messagesListItem: {
    borderRadius: 50,
    height: 70,
    width: 300,
    // backgroundColor: Color.colorGray_100,
    marginBottom: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  messagesListPhoto: {
    height: 70,
    width: 70,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    overflow: 'hidden',
    borderRadius: 50,
  },
  messagesListPhotoImageStyle: {

  },
  messagesListItemText: {
    fontSize: 15,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.black,
  },
  messagesHeaderText: {
    fontFamily: FontFamily.interMedium,
    fontSize: 25,
    fontWeight: "900",
    color: Color.colorRed_3,
    marginBottom: padding.sm,
    justifyContent: "flex-start"
  },
  messagesListItemHeadingWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: padding.xxs / 2,
    // flex: 1
  },
  messagesListItemName: {
    fontSize: 17,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.black,
  },
  messagesListItemTime: {
    fontSize: 12,
    fontFamily: FontFamily.interRegular,
    fontWeight: "900",
    color: colors.black,
    marginLeft: padding.xxs
  },
  messagesListChatWrapper: {
    flex: 1
  },
  messagesListChat: {
    fontSize: 12,
    fontFamily: FontFamily.interRegular,
    fontWeight: "900",
    color: colors.black,
  },
  messagesListTextWrapper: {
    paddingLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1
  },
  pageContentWrapper: {
    backgroundColor: Color.colorGray_900,
    paddingTop: padding.md
  }
});

export default MatchesListPage;
