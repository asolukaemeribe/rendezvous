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
import { AuthContext } from "../AppAuthContext";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "./profilePage"
import { FontAwesome } from '@fortawesome/react-native-fontawesome'
import Ionicons from 'react-native-vector-icons/Ionicons'


const config = require('../config.json');
const Stack = createNativeStackNavigator();

const LocationsNearby = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const auth = FIREBASE_AUTH;
  const { signOut, getUserID } = React.useContext(AuthContext)
  const userID = route.params.userID;

  // this is initial state of locations data when loaded onto the page
  const initialLocationsNearbyData = [
    {
      id: "location1",
      location_name: "White Dog Cafe",
      distance: "1.7 mi",
      category: "Restaurant",
      price: 2,
      favorited: false,
      photo_path: require("../assets/images/white_dog.jpg")
    },
    {
      id: "location2",
      location_name: "Cira Green",
      distance: "2.5 mi",
      category: "Park",
      price: 0,
      favorited: true,
      photo_path: require("../assets/images/cira_green.jpg")
    },
  ];

  const initialCategoriesArray = [
    {
      id: "All",
      name: "All",
      isSelected: true,
    },
    {
      id: "Favorites",
      name: "Favorites",
      isSelected: false,
    },
    {
      id: "Restaurant",
      name: "Restaurant",
      isSelected: false,
    },
    {
      id: "Bar",
      name: "Bar",
      isSelected: false,
    },
    {
      id: "Park",
      name: "Park",
      isSelected: false,
    },
    {
      id: "Museum",
      name: "Museum",
      isSelected: false,
    },
    {
      id: "Cafe",
      name: "Cafe",
      isSelected: false,
    },
    {
      id: "Gym",
      name: "Gym",
      isSelected: false,
    },
    {
      id: "Store",
      name: "Store",
      isSelected: false,
    },
    {
      id: "Other",
      name: "Other",
      isSelected: false,
    },
  ]

  // THIS IS CURRENT STATE OF LOCATIONS DATA (favorited might have changed)
  const [locationsNearbyData, setLocationsNearbyData] = useState(initialLocationsNearbyData);
  const [currentCategoryLocationsNearbyData, setCurrentCategoryLocationsNearbyData] = useState(initialLocationsNearbyData);
  const [categoriesArray, setCategoriesArray] = useState(initialCategoriesArray);

  // const [nearbyLocationsData, setnearbyLocationsData] = useState([{id: "", first_name: "", last_name: ""}])

  useEffect(() => {
      const { userID, lat, long, rad } = route.params;

      const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        //setLocation(location);
        getnearbyLocations(location);
      }

      const getnearbyLocations = (location) => {
        console.log("POT MATCHES PAGE UID: " + userID)
        console.log("POT MATCHES PAGE LAT: " + location.coords.latitude)
        console.log("POT MATCHES PAGE LONG: " + location.coords.longitude)
        console.log("POT MATCHES PAGE RAD: " + 16094)

        
        fetch(`http://${config.server_host}:${config.server_port}/getusersinradius?uid=${userID}&lat=${location.coords.latitude}&long=${location.coords.longitude}&rad=${16094}`)
        .then(res => res.json())
        .then(resJson => {
          console.log("POT MATCHES PAGE resJson: ")
          console.log(resJson)
          setnearbyLocationsData(resJson);  
        });
      }

      getLocation()
  }, []);

  // CATEGORY BUTTONS SELECT AND DESELECT RENDERING HERE
  const renderCategoryButtonItem = (item, array, setArrayFunction) => {
    const index = categoriesArray.findIndex((type) => type.id === item.id);
    const handleCategoryButtonPress = () => {
      const index = array.findIndex((type) => type.id === item.id);
  
      setArrayFunction((prevArray) => {
        const newArray = prevArray.map((item) => ({
          ...item,
          isSelected: false,
        }));
  
        newArray[index].isSelected = true;

        if (item.id === "All") {
          setCurrentCategoryLocationsNearbyData(locationsNearbyData);
        } 
        else if (item.id === "Favorites") {
          setCurrentCategoryLocationsNearbyData(locationsNearbyData.filter((location) => (location.favorited === true)));
        }
        else {
          setCurrentCategoryLocationsNearbyData(
            locationsNearbyData.filter((location) => location.category === item.id)
          );
        }
  
        return newArray;
      });
    };
    return (
      <Pressable
        style={[
          styles.listButtonItem,
          categoriesArray[index].isSelected
            ? styles.listButtonItemSelected
            : styles.listButtonItemUnselected,
        ]}
        onPress={() => handleCategoryButtonPress()}
      >
        <Text style={styles.listButtonItemText}>{item.name}</Text>
      </Pressable>
    );
  }

  // THIS HANDLES RENDERING AND STATE CHANGE OF EACH LOCATION ITEM/BLOCK 
  const renderButtonItem = (item) => {

    function handleButtonPress() {
      // todo: Need to navigate to the location page
    }

    function favoriteButtonPress(item) {
      // Need to update this also in the database

      setLocationsNearbyData(locationsNearbyData.map((location) => {
        if (location.id === item.id) {
          return {...location, favorited: !location.favorited};
        } else {
          return location;
        }
      }));

      setCurrentCategoryLocationsNearbyData(currentCategoryLocationsNearbyData.map((location) => {
        if (location.id === item.id) {
          return {...location, favorited: !location.favorited};
        } else {
          return location;
        }
      }));
    }

    const source = item.photo_path;

    return (
      <Pressable
        style={[
          styles.nearbyLocationsListItem,
        ]}
        onPress={() => handleButtonPress()}
      >
        <ImageBackground
          style={styles.nearbyLocationsListPhoto}
          imageStyle={styles.nearbyLocationsListPhotoImageStyle}
          source={source}
        >
          <Pressable onPress={() => favoriteButtonPress(item)} style={styles.nearbyLocationsListStarIcon}>
            <Octicons
                name={item.favorited ? "star-fill" : "star"}
                size={30}
                color={item.favorited ? Color.colorYellow : Color.colorWhite}
              />
            </Pressable>
          <Text style={styles.nearbyLocationsListItemText}>{item.location_name}</Text>
          <Text style={styles.nearbyLocationsListItemDistanceText}>{item.distance}  {Array(item.price).fill('$').join('')}</Text>
          <Text style={styles.nearbyLocationsListItemCategoryText}>{item.category}</Text>
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
                <Pressable onPress={() => logOut()}>
                  <Octicons style={styles.topNavigationBarSignOut} name="sign-out" size={32} color="white" />
                </Pressable>

              </View>
              <View style={styles.creationHeaderWrapper}>
                <Text style={styles.creationHeaderText}>Locations Nearby</Text>
              </View>
              <View style={styles.buttonsListWrapper}>
              <FlatList
                data={categoriesArray}
                renderItem={({ item }) =>
                  renderCategoryButtonItem(item, categoriesArray, setCategoriesArray)
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
              <ScrollView contentContainerStyle={styles.nearbyLocationsViewWrapper}>
                <View style={styles.nearbyLocationsFirstWrapper}>
                  <FlatList
                    data={currentCategoryLocationsNearbyData}
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

const LocationsNearbyStack = ({ route, navigation }) => {
  const userID = route.params.userID;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationsNearby" component={ LocationsNearby } initialParams={{userID:userID}}/>
      {/* <Stack.Screen name="ProfilePage" component={ ProfilePage } initialParams={{userID:userID}}/> */}
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
    // alignItems: "center",
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
  nearbyLocationsViewWrapper: {
    paddingHorizontal: padding.xl,
    paddingTop: padding.xxs,
    alignItems: "flex-start",
    flexDirection: "row"
  },
  nearbyLocationsFirstWrapper: {
    alignItems: "flex-start",
    flex: 1
  },
  nearbyLocationsSecondWrapper: {
    alignItems: "flex-end",
    flex: 1
  },
  nearbyLocationsListItem: {
    borderRadius: 10,
    height: 150,
    width: 325,
    backgroundColor: Color.colorBlack,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10
  },
  nearbyLocationsListItemText: {
    fontSize: 20,
    fontFamily: FontFamily.interBold,
    fontWeight: "900",
    color: colors.white,
  },
  nearbyLocationsListItemDistanceText: {
    fontSize: 13,
    fontFamily: FontFamily.interMedium,
    fontWeight: "900",
    color: colors.white,
  },
  nearbyLocationsListItemCategoryText: {
    fontSize: 13,
    fontFamily: FontFamily.interMedium,
    fontWeight: "900",
    color: colors.white,
  },
  nearbyLocationsListPhoto: {
    height: 150,
    width: 325,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,

  },
  nearbyLocationsListPhotoImageStyle: {
    opacity: 0.6
  },
  topNavigationBarSignOut: {
    alignSelf: "flex-start",
  },
  nearbyLocationsListStarIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },

});

export default LocationsNearbyStack;
