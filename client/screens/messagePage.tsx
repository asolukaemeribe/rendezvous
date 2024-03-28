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
import { AuthContext } from "../AppAuthContext";
import { useEffect, useState, useRef } from "react";
import { setUpSocketIO, sendMessage } from "../logic/messaging";
let messageId = 1248723;

// let messagesRefresh = false;

const config = require('../config.json');
// const messagesViewRef = useRef();
const MessagePage = ({ route, navigation }) => {
  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;
  const [messagesRefresh, setMessagesRefresh] = useState(true);
  const [room, setRoom] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messagesRef = useRef();
  const userID = route.params.userID;
  const selfUserID = userID;
  const receivingChatUserID = route.params.receivingUserID;
  const suggestedLocationName = route.params.suggestedLocationName  
                    ? "Hey! Wanna meet up at " + route.params.suggestedLocationName + "?"
                    : "";
  const receivingName = route.params.receivingName;
  console.log("Message page self userID: " + selfUserID);
  console.log("Message page receiving userID: " + receivingChatUserID);
  console.log("Message page receiving Name: " + receivingName);

  const [currMessage, setCurrMessage] = React.useState(suggestedLocationName);

  useEffect(() => {

    fetch(`http://${config.server_host}:${config.server_port}/getroom?uid1=${selfUserID}&uid2=${receivingChatUserID}`)
        .then(res => res.json())
        .then(resJson => {
          console.log("ROOM resJson: ")
          console.log(resJson)

          setRoom(resJson[0]["room"]) 
          setUpSocketIO((x) => {

            let newMessage = messagesList


            newMessage.push({
              id: messageId.toString(),
              sender_uid: receivingChatUserID as string,
              receiver_uid: selfUserID as string,
              message: x,
              timestamp: "2/9/23 10:19 AM" // need to get current timestamp
            })

            //setMessagesList(newMessage)
            setMessagesRefresh(!messagesRefresh)

            messageId++
          }, resJson[0]["room"])
    });
  },[])

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
    sendMessage(room, currMessage)
    messagesList.push({
      id: messageId.toString(), //idk
      sender_uid: selfUserID,
      receiver_uid: receivingChatUserID,
      message: currMessage,
      timestamp: "1/2/3 10:10 PM" // get current timestamp
    });
    setMessagesRefresh(!messagesRefresh);
    messageId += 1;
    setCurrMessage("");
  }

  const getMessageHistory = () => {
    // get from db
    // write all to screen
    // may or may not have decided not to do :)
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
            <View style={styles.profileImageNameWrapper}>
              <Image
                style={styles.messagesListPhoto}
                // imageStyle={styles.messagesListPhotoImageStyle}
                source={require("../assets/images/defaultProfilePicDark.png")}
              />
              <Text style={styles.profileNameTextStyle}>{receivingName}</Text>
            </View>
            {/* <Text style={styles.profilePageLogo}>Rendezvous</Text> */}
            <View style={{ width: 29 }}></View>
          </View>
        </View>


      </LinearGradient>
      <View style={styles.messagesView} behavior="padding">
        <FlatList
          data={messagesList}
          renderItem={({ item }) =>
            renderMessageItem(item)
          }
          extraData={messagesRefresh}
          keyExtractor={(item) => 
            item.id
          }
          ref={messagesRef}
          onContentSizeChange={() => messagesRef.current.scrollToEnd()}
        />
      </View>
      <KeyboardAvoidingView contentContainerStyle={styles.messageEntryView} style={styles.messageEntryView} behavior={"position"}>
        <View style={styles.messageTextInputWrapper}>
          <TextInput
            style={styles.messageTextInput}
            onChangeText={setCurrMessage}
            value={currMessage}
            placeholder="Type a message"
          />
          <Pressable style={styles.sendButton}>
            <Text style={styles.sendButtonText} onPress={() => handleMessageSend()}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
    // {/* </KeyboardAvoidingView> */}
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 2,
    backgroundColor: "transparent",
    width: "100%",
  },
  pageGradient: {
    flex: 2.9,
    backgroundColor: "transparent",
    width: "100%",
    position: "relative"
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
    // height: 10,
    // position: "absolute"
    backgroundColor: Color.colorGray_300,

  },
  messageEntryView: {
    flex: 1.7,
    backgroundColor: Color.colorWhite,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: padding.lg,
    // paddingVertical: padding.sm
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
  },
  messagesListPhoto: {
    height: 60,
    width: 60,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    overflow: 'hidden',
    borderRadius: 30,
    marginBottom: 3
    // marginTop: 20
  },
  messagesListPhotoImageStyle: {

  },
  profileImageNameWrapper: {
    alignItems: "center",
    paddingTop: 39
  },
  profileNameTextStyle: {
    fontSize: 15,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.white,
  }
});

export default MessagePage;

// function to get messages/chat history from database
// anytime a new message comes in, function that adds message to list