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
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'

const AddUserInfo = ({ route, navigation }) => {
  const [selectedRaces, setSelectedRaces] = useState([]);
  const { userID } = route.params; 
  const [selectedLookingFor, setSelectedLookingFor] = React.useState(null);
  const [selectedReligion, setSelectedReligion] = React.useState("");
  const [selectedLanguages, setSelectedLanguage] = React.useState([]);
  const [hometown, setHometown] = React.useState("");

  const lookingForArray = 
  [
    "Short Term",
    "Long Term",
    "Open to Either"
  ];

  const renderSelectMultipleButtonItem = (item) => {
      const handleButtonPress = () => {
          if (selectedRaces.includes(item)) {
              setSelectedRaces(selectedRaces.filter((selectedItem) => selectedItem !== item));
          } else if (selectedRaces.length < 5) {
              setSelectedRaces([...selectedRaces, item]);
          }
      };
      
      return (
          <Pressable
            style={[
              styles.listButtonItem,
              selectedRaces.includes(item)
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

  const renderButtonItem = (item, setSelected) => {
    const handleButtonPress = () => {
        setSelected(item)
    };
    
    return (
        <Pressable
          style={[
            styles.listButtonItem,
            item in [selectedLookingFor, ]
              ? styles.listButtonItemSelected
              : styles.listButtonItemUnselected,
          ]}
          onPress={() => handleButtonPress()}
        >
          <Text style={styles.listButtonItemText}>{item}</Text>
        </Pressable>
    );
        }

    const races = [
      "Prefer not to say",
      "American Indian/Alaska",
      "Asian",
      "Black/African American",
      "Hispanic/Latinx",
      "Native Hawaiian/Pacific",
      "White",
      "Other"
    ]

    const spokenLanguages = [
      "English",
      "Mandarin Chinese",
      "Spanish",
      "Hindi",
      "French",
      "Standard Arabic",
      "Bengali",
      "Russian",
      "Portuguese",
      "Urdu",
      "Indonesian",
      "German",
      "Japanese",
      "Swahili",
      "Telugu",
      "Marathi",
      "Tamil",
      "Turkish",
      "Vietnamese",
      "Korean",
      "Italian",
      "Punjabi",
      "Gujarati",
      "Ukrainian",
      "Polish",
      "Malayalam",
      "Kannada",
      "Oriya",
      "Burmese",
      "Sinhala",
      "Farsi (Persian)",
      "Hausa",
      "Thai",
      "Yoruba",
      "Tagalog (Filipino)",
      "Sindhi",
      "Dutch",
      "Romanian",
      "Maithili",
      "Kurdish",
      "Amharic",
      "Nepali",
      "Somali",
      "Igbo",
      "Malagasy",
      "Hungarian",
      "Greek",
      "Czech",
      "Bulgarian",
      "Serbo-Croatian",
      "Kazakh",
      "Swedish",
      "Danish",
      "Finnish",
      "Norwegian",
      "Hebrew",
      "Slovak",
      "Lithuanian",
      "Latvian",
      "Estonian",
      "Slovenian",
      "Albanian",
      "Icelandic",
      "Maltese",
      "Luxembourgish",
      "Georgian",
      "Armenian",
      "Uzbek",
      "Mongolian",
      "Pashto",
      "Javanese",
      "Burmese",
      "Nepali",
      "Cebuano",
      "Zulu",
      "Dhivehi",
      "Maltese",
      "Basque",
      "Galician",
      "Belarusian",
      "Macedonian",
      "Armenian",
      "Luxembourgish",
      "Catalan",
      "Azerbaijani",
      "Turkmen",
      "Tatar",
      "Uighur",
      "Kyrgyz",
      "Dari",
      "Tajik",
      "Uyghur",
      "Albanian",
      "Akan",
      "Fijian",
      "Creole",
      "Samoan",
      "Tongan",
      "Chichewa"
    ];

    const religions = [
      "Christianity",
      "Islam",
      "Judaism",,
      "Hinduism",
      "Buddhism",
      "Sikhism",
      "Jainism",
      "Zoroastrianism",
      "Bahá'í Faith",
      "Shinto",
      "Taoism",
      "Confucianism",
      "Indigenous religions",
      "Wicca",
      "Druidry",
      "Asatru",
      "Rastafarianism",
      "Scientology",
      "Baha'i Faith",
      "Unitarian Universalism",
      "Spiritualism",
      "Thelema",
      "Falun Gong",
      "Cao Dai",
      "Tenrikyo",
      "Hare Krishna (ISKCON)",
      "Eckankar",
      "Santo Daime",
      "Sufism",
      "Druze",
      "Animism",
      "Shaktism",
      "Jainism",
      "Zoroastrianism",
      "Taoism",
      "Shinto",
      "Bön",
      "Ásatrú",
      "Wicca",
      "Druidry",
      "Neo-Paganism",
      "Candomblé",
      "Santería",
      "Vodou (Voodoo)",
      "Hellenism",
      "Romuva",
      "Seicho-no-ie",
      "Church of Satan",
      "Church of Scientology",
      "Unification Church",
      "Branch Davidians",
      "Aetherius Society",
      "Christian Science",
      "Jehovah's Witnesses",
      "Latter-Day Saint movement (Mormonism)",
      "Unitarianism",
      "Raelism",
      "Indigenous African Religions",
      "Indigenous American Religions",
      "Indigenous Australian Religions",
      "Bábism",
      "Damanhur Community",
      "Eckankar",
      "The Family International",
      "Heathenry",
      "Humanism",
      "Kemeticism",
      "Raëlism",
      "Scientology",
      "Shinshukyo",
      "Sukyo Mahikari",
      "Swedenborgianism",
      "Theosophy",
      "Thuggee",
      "Umbanda",
      "Universalism",
      "Wicca",
      "Yazidism",
      "Cao Dai",
      "Eckankar",
      "Meher Baba",
      "Scientology",
      "Tengrism",
      "Vajrayana Buddhism",
      "Tenrikyo",
      "Juche",
      "Unification Church",
      "Satanism",
      "New Age Spirituality",
      "Esotericism",
      "Agnosticism",
      "Atheism",
      "Deism",
      "Pantheism",
      "Gnosticism",
      "Neo-Druidism",
      "Reconstructionist Polytheism",
      "Esoteric Christianity",
      "Discordianism"
  ];

    const addInterests = () => {
      navigation.navigate("DatePreferencesPage", {userID: userID})
    }
  

    return (
      <View style={styles.pageView}>
          <LinearGradient
          style={styles.pageGradient}
          locations={[0, 0.9]}
          colors={["#ff0000", "#db17a4"]}
          >
             <View style={styles.creationHeaderWrapper}>
                <Text style={styles.creationHeaderText}>Tell us more</Text>
              </View>
              <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Hometown</Text>
              </View>
              <TextInput
                style={[styles.displayNameEntryText, styles.textEntry]}
                placeholder="Hometown"
                placeholderTextColor={colors.white_55}
                blurOnSubmit={true}
                value={hometown}
                onChangeText={(text) => setHometown(text)}
              ></TextInput>
              <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Looking For</Text>
              </View>
              <SelectList
                  setSelected={(val) => setSelectedLookingFor(val)} 
                  data={lookingForArray} 
                  save="value"
                  boxStyles={styles.selectList}
                  dropdownStyles={styles.selectList}
                  />
                  <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Race</Text>
                  </View>
                <View style={styles.buttonsListWrapper}>
                  <FlatList
                  numColumns={2}
                  data={races}
                  renderItem={({ item }) =>
                  renderSelectMultipleButtonItem(
                      item
                  )
                  }
                  keyExtractor={(item) => item}
                  />
                </View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Religion</Text>
                  </View>
                  <SelectList
                  setSelected={(val) => setSelectedReligion(val)} 
                  data={religions} 
                  save="value"
                  boxStyles={styles.selectList}
                  dropdownStyles={styles.selectList}
                  />
                  <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Languages</Text>
                  </View>
                  <MultipleSelectList
                  setSelected={(val) => setSelectedLanguage([...selectedLanguages, val])} 
                  data={spokenLanguages} 
                  save="value"
                  boxStyles={styles.selectList}
                  dropdownStyles={styles.selectList}
                  />
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
      fontSize: 30,
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
  textEntry: {
    backgroundColor: colors.white_55,
    borderRadius: 10,
    borderColor: colors.white_55,
    borderWidth: 1,
    color: colors.white,
    marginLeft: 35
  }
});

export default AddUserInfo;