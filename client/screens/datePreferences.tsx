import * as React from "react";
import { useState } from 'react';
import { ScrollView,
            View, 
            Text,
            StyleSheet,
            FlatList,
            Pressable, 
            TouchableOpacity,
            TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import { LinearGradient } from "expo-linear-gradient";
import colors from "../assets/global_styles/color";
import padding from "../assets/global_styles/padding";
import { FontFamily, Color } from "../GlobalStyles";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
const config = require('../config.json');

const DatePreferencesPage = ({ route, navigation }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const { userID } = route.params; 
  const [selectedPriceLevel, setSelectedPriceLevel] = React.useState("");
  const [isVegetarian, setIsVegetarian] = React.useState("");


  const renderSelectMultipleButtonItem = (item) => {
      const handleButtonPress = () => {
          if (selectedTimes.includes(item)) {
              setSelectedTimes(selectedTimes.filter((selectedItem) => selectedItem !== item));
          } else if (selectedTimes.length < 5) {
              setSelectedTimes([...selectedTimes, item]);
          }
      };
      
      return (
          <Pressable
            style={[
              styles.listButtonItem,
              selectedTimes.includes(item)
                ? styles.listButtonItemSelected
                : styles.listButtonItemUnselected,
            ]}
            onPress={() => handleButtonPress()}
          >
            <Text style={styles.listButtonItemText}>{item}</Text>
          </Pressable>
          //<Text>hey</Text>
        );
  }

    const timesOfDay = [
      "Morning",
      "Afternoon",
      "Night"
    ]

    const priceLevel = [
        "$",
        "$$",
        "$$$",
        "$$$$",
        "$$$$$"
    ];

    const vegetarian = [
        "Yes",
        "No"
  ];

    const addDatePreferences = () => {
        fetch(`http://${config.server_host}:${config.server_port}/updatedatepreferences?uid=${userID}` + 
        `&vegetarian=${isVegetarian}` + `&priceLevel=${selectedPriceLevel}` + `&timesOfDay= ${selectedTimes}`)
          .then(res => {console.log("info updated")})
      navigation.navigate("PictureSelection", {userID: userID})
    }
  

    return (
      <View style={styles.pageView}>
          <LinearGradient
          style={styles.pageGradient}
          locations={[0, 0.9]}
          colors={["#ff0000", "#db17a4"]}
          >
             <View style={styles.creationHeaderWrapper}>
                <Text style={styles.creationHeaderText}>Help us pick your first dates!</Text>
              </View>
              <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Preferred Price Level</Text>
              </View>
              <SelectList
                  setSelected={(val) => setSelectedPriceLevel(val)} 
                  data={priceLevel} 
                  save="value"
                  boxStyles={styles.selectList}
                  dropdownStyles={styles.selectList}
                  />
                  <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Preferred Time of Day</Text>
                  </View>
                <View style={styles.buttonsListWrapper}>
                  <FlatList
                  data={timesOfDay}
                  renderItem={({ item }) =>
                  renderSelectMultipleButtonItem(
                      item
                  )
                  }
                  horizontal
                  keyExtractor={(item) => item}
                  />
                </View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Vegetarian?</Text>
                  </View>
                  <SelectList
                  setSelected={(val) => setIsVegetarian(val)} 
                  data={vegetarian} 
                  save="value"
                  boxStyles={styles.selectList}
                  dropdownStyles={styles.selectList}
                  />
                  <Pressable style={styles.continueButton} onPress={() => addDatePreferences()}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>
          
          </LinearGradient>
      </View>
    );
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
  buttonsListWrapper: {
    paddingLeft: padding.xl,
    paddingRight: padding.xs,
  },
  listButtonItem: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 15,
    marginBottom: 5,
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
    fontSize: 12,
    textAlign: "center",
    color: colors.white,
  },
  headerWrapper: {
    paddingHorizontal: padding.xl,
    marginTop: 15,
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
    marginLeft: 300,
    marginTop: 25
  },
  continueButtonText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "600",
  },
  headerText: {
      fontFamily: FontFamily.interBold,
      fontSize: 23,
      fontWeight: "700",
      color: Color.colorWhite,
      alignItems: "center",
    },  
    creationHeaderWrapper: {
      paddingHorizontal: padding.xl,
      height: 55,
      paddingTop: padding.xxs,
      marginTop: 75
    },
    creationHeaderText: {
      fontFamily: FontFamily.interBold,
      fontSize: 24,
      fontWeight: "900",
      color: Color.colorWhite,
    },
    selectList: {
      borderRadius: 10,
      borderWidth: 1,
      marginBottom: 5,
      padding: 10,
      width: 300,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white_55, // Adjust di background color as needed
      borderColor: colors.white_55, // Adjust di border color as needed
      color: colors.white,
      flexDirectioan: 'row',
      marginLeft: 35
  }
});

export default DatePreferencesPage;