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
  ImageBackground,
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
import { AuthContext } from "../AppAuthContext"
import { useEffect, useState, useRef } from "react";

let messagesList = [
  {
    id: "1274627638",
    sender_uid: "boonloo1",
    receiver_uid: "lukaemeribe2",
    message: "Heyyyyyyy",
    timestamp: "2/9/23 10:19 AM",
  },
  {
    id: "158273092",
    sender_uid: "lukaemeribe2",
    receiver_uid: "boonloo1",
    message: "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.",
    timestamp: "2/9/23 10:19 AM",
  }
];
let messageId = 1248723;

// let messagesRefresh = false;

const config = require('../config.json');
// const messagesViewRef = useRef();
const MessagePage = ({ route, navigation }) => {
  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;
  const [currMessage, onChangeMessage] = React.useState('');
  const [messagesRefresh, setMessagesRefresh] = useState(true);
  const messagesRef = useRef();


  const { getCreatingAccountData } = React.useContext(AuthContext);
  // const selfUserID = getUserID();
  // const receivingChatUserID = route.params.userID;
  // --------------------------MATT-------------------^ TODO: use this when working
  const selfUserID = "lukaemeribe2";
  const receivingChatUserID = "boonloo1";

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
  // };

  // useEffect(() => {
  //   navigation.getParent('tabs').setOptions({tabBarStyle: {display: 'none'}})
  // })

  const renderMessageItem = (item) => {

    const handleMessagePress = () => {
      return;
    };

    return (
      <Pressable
        style={[
          item.sender_uid === selfUserID ? styles.messageBubbleSender : styles.messageBubbleReceiver
        ]}
        onPress={() => handleMessagePress()}
      >
        {/* <View> */}
        <Text style={styles.messageText}>{item.message}</Text>
        {/* </View> */}
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

  // ---MATT---


  const handleMessageSend = () => {
    messagesList.push({
      id: messageId.toString(), //idk
      sender_uid: selfUserID,
      receiver_uid: receivingChatUserID,
      message: currMessage,
      timestamp: "1/2/3 10:10 PM"
    });
    setMessagesRefresh(!messagesRefresh);
    messageId += 1;
  }

  const getMessageHistory = () => {

  }

  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat);
  const mask = 'MM/DD/YYYY';

  return (
    // <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
    <View style={styles.pageView}>
      <StatusBar style="light" />
      <LinearGradient
        style={styles.pageGradient}
        locations={[0, 0.9]}
        colors={["#ff0000", "#db17a4"]}
      >
        <View style={[{ paddingTop: insets.top * 0.8 }]} />
        <View style={styles.topMenuWrapper}>
          {/* <Pressable onPress={() => logOut()}>
            <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
          </Pressable> */}
          <View style={styles.topNavigationBarWrapper}>
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={32} color="white" />
            </Pressable>
            <Text style={styles.profilePageLogo}>Rendezvous</Text>
            <View style={{ width: 29 }}></View>
          </View>
        </View>
        <View style={styles.creationHeaderWrapper}>
          <Text style={styles.creationHeaderText}></Text>
        </View>

      </LinearGradient>
      <View style={styles.messagesView}>
        <FlatList
          data={messagesList}
          renderItem={({ item }) =>
            renderMessageItem(item)
          }
          extraData={messagesRefresh}
          keyExtractor={(item) => item.id
          }
          ref={messagesRef}
          onContentSizeChange={() => messagesRef.current.scrollToEnd()}
        />
      </View>
      <KeyboardAvoidingView style={styles.messageEntryView} behavior="padding">

        <View style={styles.messageTextInputWrapper}>
          <TextInput
            style={styles.messageTextInput}
            onChangeText={onChangeMessage}
            value={currMessage}
            placeholder="Type a message"
          />
          <Pressable style={styles.sendButton}>
            <Text style={styles.sendButtonText} onPress={() => handleMessageSend()}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 2,
    backgroundColor: "transparent",
    width: "100%",
  },
  pageGradient: {
    flex: 2.8,
    backgroundColor: "transparent",
    width: "100%",
  },
  messageEntryGradient: {
    flex: 2.8,
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  messagesView: {
    flex: 13,
    height: 10,
    backgroundColor: Color.colorGray_300,

  },
  messageEntryView: {
    flex: 1.7,
    backgroundColor: Color.colorWhite,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
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
  topNavigationBarWrapper: {
    // height: 44,
    // width: "100%",
    // backgroundColor: Color.colorTransparent,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // alignItems: "center",
    paddingHorizontal: padding.xxs,
    marginBottom: 10,
  },
  profilePageLogo: {
    fontFamily: FontFamily.robotoBold,
    fontSize: 23,
    color: Color.colorWhite,
    // textAlign: "center",
    // alignSelf: "center",
  },
  topNavigationBarSignOut: {
    // position: "absolute",
    // left: 17,
    // top: 17,
    alignSelf: "flex-start",
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
  messageTextInputWrapper: {
    backgroundColor: Color.colorGray_500,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 35,
    width: 350,
    marginTop: 15,
    borderRadius: 15,
    paddingLeft: 19,
    borderColor: Color.colorGray_400,
    borderWidth: 1
  },
  messageTextInput: {
    flex: 8
  },
  sendButton: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
  sendButtonText: {
    fontWeight: "bold",
    color: Color.colorRed_1
  },
  messageText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontSize: 15,
    fontWeight: "900",
  },
  messageBubbleReceiver: {
    alignSelf: "flex-start",
    backgroundColor: Color.colorRed_2,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    maxWidth: "65%",
  },
  messageBubbleSender: {
    alignSelf: "flex-end",
    backgroundColor: Color.colorGray_700,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    maxWidth: "65%",
  }
});

export default MessagePage;

// function to get messages/chat history from database
// anytime a new message comes in, function that adds message to list