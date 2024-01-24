import * as React from "react";

import { Button, Image, View, Platform, StyleSheet, Pressable, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/global_styles/color";
const config = require('../config.json');

const PictureSelection = ({ route, navigation }) => {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

const addProfilePicture = () => {
    const { userID } = route.params;
    console.log(image);
    fetch(`http://${config.server_host}:${config.server_port}/updateimage?uid=${userID}` + 
    `&uri=${image}`)
      .then(res => {console.log("picture updated")})

    navigation.navigate("ProfilePage", {userID: userID})
}

  return (
    <LinearGradient
    style={styles.gradientContainer}
    locations={[0, 1]}
    colors={[colors.red, colors.pink]}
    >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Choose Profile Picture" onPress={pickImage} />
        </View>
        <Pressable style={styles.continueButton} onPress={() => addProfilePicture()}>
            <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    gradientContainer: {
      flex: 1,
      width: "100%",
      height: 844,
      backgroundColor: "transparent",
      overflow: "hidden",
    },
    container: {
      flex: 1,
    },
    continueButton: {
        backgroundColor: colors.blue,
        height: 45,
        width: 95,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        position: 'absolute',
        padding: 10,
        bottom: 45,
        right: 50
      },
      continueButtonText: {
        fontSize: 15,
        color: colors.white,
        fontWeight: "600",
      },
});

export default PictureSelection;