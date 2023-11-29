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
} from "react-native";
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

const ProfilePage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();

  const [aboutMe, setAboutMe] = React.useState("");
  const [pronouns, setPronouns] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [date, setDate] = React.useState(new Date(null));
  const [dateStr, setDateStr] = React.useState("");

  // Code for date picker
  // const [showDatePicker, setShowDatePicker] = React.useState(false);
  // const toggleDatepicker = () => {
  //   setShowDatePicker(!showDatePicker);
  // }
  // const datePickerOnChange = ({ type }, selectedDate) => {
  //   if (type === "set") {
  //     setDate(selectedDate);
  //   }
  //   else {
  //     toggleDatepicker();
  //   }
  // }

  const [genderTypesArray, setGenderTypesArray] = React.useState(
    Object.entries(
      profileInfoData.find((item) => item.category === "Gender").types
    ).map(([key, value]) => ({
      id: key,
      isSelected: value,
    }))
  );

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

  const renderButtonItem = (item, array, setArrayFunction) => {
    const handleButtonPress = () => {
      const index = array.findIndex((type) => type.id === item.id);

      // TODO: This can be used when multiple can be selected at once
      // setGenderTypesArray((prevArray) => {
      //   const newArray = [...prevArray];
      //   newArray[index].isSelected = !newArray[index].isSelected;
      //   return newArray;
      // });
      setArrayFunction((prevArray) => {
        const newArray = prevArray.map((item) => ({
          ...item,
          isSelected: false,
        }));

        newArray[index].isSelected = true;

        return newArray;
      });
    };

    return (
      <Pressable
        style={[
          styles.listButtonItem,
          item.isSelected
            ? styles.listButtonItemSelected
            : styles.listButtonItemUnselected,
        ]}
        onPress={() => handleButtonPress()}
      >
        <Text style={styles.listButtonItemText}>{item.id}</Text>
      </Pressable>
    );
  };

  const getSelected = (array) => {
    return array.find((item) => item.isSelected).id;
  }

  // ------ For Matt ------ //
  const createProfile = () => {
    console.log("Create Profile");
    console.log("first_name: " + firstName);
    console.log("last_name: " + lastName);
    console.log("about_me: " + aboutMe);
    console.log("pronouns: " + pronouns);
    console.log("gender: " + getSelected(genderTypesArray));
    console.log("orientation: " + getSelected(orientationTypesArray));
    console.log("birthday: " + dateStr);
    console.log("age: ");

    // Date (non-string) I'll figure out later but also maybe no need
    console.log(date.toString());
    navigation.navigate("ProfilePage");
  }
  // TODO: Don't allow user to navigate back to home page from here

  const mask = "MM-DD-YYYY";
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
            <Feather name="chevron-left" size={32} color="white" />
          </View>
          <ScrollView contentContainerStyle={{ paddingTop: 5 }}>
            <View style={styles.creationHeaderWrapper}>
              <Text style={styles.creationHeaderText}>Create Your Profile</Text>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Display Name</Text>
            </View>
            <View style={styles.displayNameEntryWrapper}>
              <TextInput
                style={[styles.displayNameEntryText, styles.textEntry]}
                placeholder="First Name"
                placeholderTextColor={colors.white_55}
                blurOnSubmit={true}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              ></TextInput>
              <TextInput
                style={[styles.displayNameEntryText, styles.textEntry]}
                placeholder="Last Name"
                placeholderTextColor={colors.white_55}
                blurOnSubmit={true}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              ></TextInput>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>About Me</Text>
            </View>
            <View style={styles.aboutMeEntryWrapper}>
              <TextInput
                style={[styles.aboutMeEntryText, styles.textEntry]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={colors.white_55}
                multiline
                numberOfLines={4}
                maxLength={500}
                editable
                blurOnSubmit={true}
                value={aboutMe}
                onChangeText={(text) => setAboutMe(text)}
              ></TextInput>
              <Text style={styles.aboutMeEntryLengthText}>
                {aboutMe.length}/500 characters
              </Text>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Pronouns</Text>
            </View>
            <View style={styles.pronounsEntryWrapper}>
              <TextInput
                style={[styles.pronounsEntryText, styles.textEntry]}
                placeholder="ex. she/her, they/them"
                placeholderTextColor={colors.white_55}
                blurOnSubmit={true}
                value={pronouns}
                onChangeText={(text) => setPronouns(text)}
              ></TextInput>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Gender</Text>
            </View>
            <View style={styles.buttonsListWrapper}>
              <FlatList
                data={genderTypesArray}
                renderItem={({ item }) =>
                  renderButtonItem(item, genderTypesArray, setGenderTypesArray)
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Sexual Orientation</Text>
            </View>
            <View style={styles.buttonsListWrapper}>
              <FlatList
                data={orientationTypesArray}
                renderItem={({ item }) =>
                  renderButtonItem(
                    item,
                    orientationTypesArray,
                    setOrientationTypesArray
                  )
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Birthday</Text>
            </View>
            <View style={styles.birthdayContinueWrapper}>
              {/* Code for Date Picker
               {showDatePicker && (<DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={datePickerOnChange}
                style={styles.datePicker}
              />
              )}
              {showDatePicker && 
              (<View style={styles.datePickerButtonsWrapper}>
                <Pressable style={styles.datePickerButton}></Pressable>
              </View>)} */}
              <TextInputMask
                style={[styles.birthdayEntryText, styles.textEntry]}
                blurOnSubmit={true}
                onChangeText={(formatted, extracted) => {
                  setDateStr(formatted);
                  console.log(formatted);
                  let timestamp = Date.parse(formatted);
                  console.log(timestamp);
                  setDate(new Date(timestamp));
                  console.log("date to string " + date.toString() + date + new Date(formatted.toString()))
                }}
                type="datetime"
                options={{ format: mask }}
                placeholder={mask}
                value={dateStr}
                keyboardType="numeric"
                placeholderTextColor={colors.white_55}
              />
              <Pressable style={styles.continueButton} onPress={() => createProfile()}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </Pressable>
            </View>
          </ScrollView>
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
  displayNameEntryWrapper: {
    paddingHorizontal: padding.xl,
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 19,
  },
  displayNameEntryText: {
    height: 46,
    width: 152,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  aboutMeEntryWrapper: {
    paddingHorizontal: padding.xl,
    height: 135,
  },
  aboutMeEntryText: {
    height: "88%",
    width: "100%",
    padding: 10,
    fontSize: 15,
  },
  aboutMeEntryLengthText: {
    color: colors.white,
    fontSize: 14,
    textAlign: "right",
    paddingTop: padding.xxs,
  },
  pronounsEntryWrapper: {
    paddingHorizontal: padding.xl,
    height: 35,
    marginBottom: 15,
  },
  pronounsEntryText: {
    height: 35,
    width: 150,
    padding: 10,
    fontSize: 12,
  },
  textEntry: {
    backgroundColor: colors.white_55,
    borderRadius: 10,
    borderColor: colors.white_55,
    borderWidth: 1,
    color: colors.white,
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
    fontSize: 12,
    textAlign: "center",
    color: colors.white,
  },
  headerWrapper: {
    paddingHorizontal: padding.xl,
    height: 37,
    justifyContent: "flex-start",
  },
  birthdayContinueWrapper: {
    paddingHorizontal: padding.xl,
    height: 35,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  birthdayEntryText: {
    height: 35,
    width: 150,
    padding: 10,
    fontSize: 12,
  },
  continueButton: {
    backgroundColor: colors.blue,
    height: 45,
    width: 95,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  continueButtonText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "600",
  },
  // genderButtonItemTextUnselected: {
  //   color: colors.white
  // },
  // genderButtonItemTextSelected: {
  //   color: colors.white,
  // },
});

export default ProfilePage;
