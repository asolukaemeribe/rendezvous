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
const config = require('../config.json');

const UserInterestsPage = ({ route, navigation }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { userID } = route.params;


    const renderButtonItem = (item) => {
        const handleButtonPress = () => {
          //const index = array.findIndex((type) => type.id === item.id);
    
          //TODO: This can be used when multiple can be selected at once
        //   setSelectedItems((prevArray) => {
        //     const newArray = [...prevArray];
        //     newArray[index].isSelected = !newArray[index].isSelected;
        //     return newArray;
        //   });

            if (selectedItems.includes(item)) {
                setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
            } else if (selectedItems.length < 5) {
                setSelectedItems([...selectedItems, item]);
            }
        };
        
        return (
            <Pressable
              style={[
                styles.listButtonItem,
                selectedItems.includes(item)
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

    const interests = [
        "Movies", //movie theatre
        "Books",
        "Gambling",//casino
        "Fashion",
        "Flora", // flower store
        "Animals", //
        "Shopping",
        "History",
        "Art",
        "Nightlife",
        "Outdoors", //park, camping
        "Photography",
        "Camping",
        "Bowling",
        "Gym",
        "Soccer",
        "Basketball",
        "Travelling",
        "Video Games",
        "Astrology",
        "Tennis",
        "Blogging",
        "Dancing",
        "Surfing",
        "YouTube",
        "Self Care", //Spa
        "Cars",
        "Football",
        "Brunch",
        "Boba",
        "Boxing",
        "Skiing",
        "Rugby",
        "Sneakers",
        "Tattoos",
        "Cricket",
        "Poetry",
        "Yoga",
        "Music",
        "Volunteering",
        "Magic",
        "Coffee",
        "Running",
        "Pets",
        "Beach",
        "Clubs",
        "Bars",
        "Philosophy",
        "Education",
        "Religion"
    ]

    const sortedInterests = interests.sort();

    const filterInterests = (text) => {
        setSearchText(text);
      };

    const filteredInterests = interests.filter(
        (interest) => interest.toLowerCase().includes(searchText.toLowerCase())
      );

    const handleSelectItem = (item) => {
        if (selectedItems.includes(item)) {
          setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else if (selectedItems.length < 5) {
          setSelectedItems([...selectedItems, item]);
        }
      };

      const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item);
        return (
          <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <CheckBox
                checked={isSelected}
                onPress={() => handleSelectItem(item)}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
              />
              <Text style={{ fontSize: 16 }}>{item}</Text>
            </View>
          </TouchableOpacity>
        );
      };

      const addInterests = () => {
        fetch(`http://${config.server_host}:${config.server_port}/updateimage?uid=${userID}` + 
        `&interests=${selectedItems}`)
          .then(res => {console.log("interests updated:" + `${selectedItems}`)})
        navigation.navigate("AddUserInfoPage", {userID: userID})
      }
    

      return (
        <View style={styles.pageView}>
            <LinearGradient
            style={styles.pageGradient}
            locations={[0, 0.9]}
            colors={["#ff0000", "#db17a4"]}
            >
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Please select up to 5 interests</Text>
                </View>
                <TextInput
                    style={{ height: 40, borderWidth: 1, borderColor: colors.black, borderRadius: 5, backgroundColor: colors.white,
                marginBottom: 25, marginTop: 5, textAlign: "auto", marginLeft: 20, marginRight: 20 }}
                    placeholder="   Search Interests"
                    value={searchText}
                    onChangeText={filterInterests}
                />
                <View style={styles.buttonsListWrapper}>
                    <FlatList
                    numColumns={4}
                    data={filteredInterests}
                    renderItem={({ item }) =>
                    renderButtonItem(
                        item
                    )
                    }
                    keyExtractor={(item) => item}
                    //showsHorizontalScrollIndicator={false}
                    />
                </View>
                              <Pressable style={styles.continueButton} onPress={() => addInterests()}>
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
      marginTop: 75,
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
      marginLeft: 300
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
    // genderButtonItemTextUnselected: {
    //   color: colors.white
    // },
    // genderButtonItemTextSelected: {
    //   color: colors.white,
    // },
  });

export default UserInterestsPage;