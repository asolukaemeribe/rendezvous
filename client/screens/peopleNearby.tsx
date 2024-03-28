import * as React from "react";
import * as Location from "expo-location";
import {
  Pressable,
  StyleSheet,
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
import { LinearGradient } from "expo-linear-gradient";
import { Padding, FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import padding from "../assets/global_styles/padding";
import colors from "../assets/global_styles/color";
import dayjs from "dayjs";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { AuthContext } from "../AppAuthContext";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "./profilePage";
import AWS from 'aws-sdk';
import { json } from "express";


const config = require('../config.json');
const Stack = createNativeStackNavigator();



const PeopleNearby = ({ route, navigation }) => {

  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  // const [userID, setUserID] = React.useState(null);
  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;
  const { signOut, getUserID } = React.useContext(AuthContext)
  //const [location, setLocation] = React.useState<Location.LocationObject>();
  const userID = route.params.userID;
  console.log("test peopleNearby userid ", userID);
  // const userIDs = React.useMemo((() => {
  //   async function asyncGetUserID() {
  //     await getUserID();
  //   }
  //  setUserID(asyncGetUserID())}),
  //  [getUserID]
  // );

  // console.log("people nearby userid: ", userIDs);

  const [nearbyUsersData, setNearbyUsersData] = useState([{id: "", first_name: "", last_name: "", image: null}])

  useEffect(() => {
      const { userID, lat, long, rad } = route.params;

      // get user's location
      const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        getNearbyUsers(location);
      }

      // get users who are nearby
      const getNearbyUsers = (location) => {
        console.log("POT MATCHES PAGE UID: " + userID)
        console.log("POT MATCHES PAGE LAT: " + location.coords.latitude)
        console.log("POT MATCHES PAGE LONG: " + location.coords.longitude)
        console.log("POT MATCHES PAGE RAD: " + 16094)

        
        fetch(`http://${config.server_host}:${config.server_port}/getusersinradius?uid=${userID}&lat=${location.coords.latitude}&long=${location.coords.longitude}&rad=${16094}&genders='Male', 'Female', 'Non-Binary'`)
        .then(res => res.json())
        .then(resJson => {
          console.log("POT MATCHES PAGE resJson:  ");
          console.log(resJson);
          const getProfilePic = async (id) => {
            console.log('id in profile pic: ' + id);
            AWS.config.update({
              region: process.env.AWS_REGION,
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });
            const s3 = new AWS.S3();
            
            try {
              console.log("success w: " + id);
              const downloadParams = {
                Bucket: 'rendezvous-files',
                Key: `${id}` + '.jpeg', // The name to use for the uploaded object
              };
              const response = await s3.getObject(downloadParams).promise();
              if (response.Body) {
                const imageBase64 = response.Body.toString('base64');
                return `data:image/jpeg;base64,${imageBase64}`;
              } else {
                return "../assets/images/defaultProfilePicDark.png";
              }
            } catch (error) {
              console.error('Error retrieving file:', error + ' id:' + id);
              return "../assets/images/defaultProfilePicDark.png";
            }
          }
          const updateList = async(jsonList) => {
            for (let i = 0; i < jsonList.length; i++) {
              const image = await getProfilePic(jsonList[i].id);
              jsonList[i]['image'] = image;
              if (image == "../assets/images/defaultProfilePicDark.png") {
                console.log('in update list:  ' + jsonList[i].image);
              }
              
            }
            setNearbyUsersData(jsonList); 
          }
          updateList(resJson);
        });
      }

      getLocation()
  }, []);





  //set nearby users data is a list of every single user in radius
  // what i need to do is fetch the profile pciture for each of these users and append it to each item
  // use effect is where users are fetched, it would make sense to also update pictures here since correct picture
  // must be displayed when page is loaded
  //maybe do this before SETNEARBYUSERSDATA


  const renderButtonItem = (item) => {

    const handleButtonPress = () => {
      console.log("button test user id " + userID);
      // FOR MATT: ----------item.id is the user id of the other person--------------
      navigation.push("ProfilePage", {userIsSelf: false, userID: item.id, selfUserID: userID, receivingName: item.first_name })
      // navigation.push("ProfilePage")
    }

    const source = item.photo_path;


    const imageSource = (item.image && item.image == "../assets/images/defaultProfilePicDark.png")
      ? require("../assets/images/defaultProfilePicDark.png")
      : { uri: item.image };

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
          source={imageSource} //IMPORTANT
        >
          <Text style={styles.nearbyUsersListItemText}>{item.first_name} {item.last_name}</Text>
        </ImageBackground>
      </Pressable>
    );
  };

  const getSelected = (array) => {
    const selected = array.find((item) => item.isSelected);
    return selected ? selected.id : "";
  }

  const logOut = async () => {
    signOut(auth);
  }
  // TODO: Don't allow user to navigate back to home page from here

  const everySecondItem = nearbyUsersData ? nearbyUsersData.filter((_, index) => index % 2 !== 0) : [];
  const everyFirstItem = nearbyUsersData ? nearbyUsersData.filter((_, index) => index % 2 === 0) : [];

  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat);
  const mask = 'MM/DD/YYYY';
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
                    data={everyFirstItem}
                    renderItem={({ item }) =>
                      renderButtonItem(item)
                    }
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                  />
                </View>
                <View style={styles.nearbyUsersSecondWrapper}>
                  <FlatList
                    data={everySecondItem}
                    renderItem={({ item }) =>
                      renderButtonItem(item)
                    }
                    scrollEnabled={false}
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

const PeopleNearbyStack = ({ route, navigation }) => {
  const userID = route.params.userID;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PeopleNearby" component={ PeopleNearby } initialParams={{userID:userID}}/>
      <Stack.Screen name="ProfilePage" component={ ProfilePage } initialParams={{userID:userID}}/>
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

export default PeopleNearbyStack;

// dummy data
 /*const nearbyUsersData = [
    {
      id: "boonloo1",
      first_name: "Boon",
      last_name: "Loo",
      pronouns: "he/him",
      age: "21",
      message_time: "2m",
      first_message: "Hey wanna meet up for coffee and coding on Saturday?",
      photo_path: require("../assets/images/profilePhoto.png")
    },
    {
      id: "lukaemeribe21",
      first_name: "Luka",
      last_name: "Emeribe",
      pronouns: "he/him",
      age: "22",
      message_time: "3d",
      first_message: "Let's hoop!",
      photo_path: require("../assets/images/lukaemeribe.jpg")
    },
    {
      id: "mattromage3",
      first_name: "Matt",
      last_name: "Romage",
      pronouns: "he/him",
      age: "21",
      message_time: "5d",
      first_message: "Do you like dogs? I love dogs they are so cute and fluffy, here is a photo of my small dog Matt Jr.",
      photo_path: require("../assets/images/mattromage.jpg")
    },
    {
      id: "jasonli21123",
      first_name: "Jason",
      last_name: "Li",
      pronouns: "he/him",
      age: "22",
      message_time: "5d",
      first_message: "Can't wait to rendezvous at Board and Brew on Sunday!",
      photo_path: require("../assets/images/jasonli.png")
    },
    {
      id: "craiglee",
      first_name: "Craig",
      last_name: "Lee",
      pronouns: "he/him",
      age: "22",
      message_time: "7d",
      first_message: "Yo",
      photo_path: require("../assets/images/craiglee.jpg")
    },
    {
      id: "venuc",
      first_name: "Venu",
      last_name: "Chillal",
      pronouns: "he/him",
      age: "22",
      message_time: "2w",
      first_message: "I'll sing u a lullaby",
      photo_path: require("../assets/images/venuchillal.png")
    },
    {
      id: "daisyt",
      first_name: "Daisy",
      last_name: "Teller",
      pronouns: "she/her",
      age: "22",
      message_time: "2w",
      first_message: "What's your favorite flower?",
      photo_path: require("../assets/images/daisyteller.jpg")
    },
  ]; */
