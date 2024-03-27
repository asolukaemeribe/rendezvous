import * as React from "react";

import { Button, Image, View, StyleSheet, Pressable, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/global_styles/color";
const config = require('../config.json');
import { Auth } from "firebase/auth";
import AWS from 'aws-sdk';
// import {  } from "module";
// import { Amplify } from "";
import { AuthContext } from "../AppAuthContext";

import { RNS3 } from 'react-native-aws3';



const PictureSelection = ({ route, navigation }) => {
  const [image, setImage] = React.useState(null);
  const { signIn, signOut, signUp, getCreatingAccountData } = React.useContext(AuthContext)
  const userID = route.params.userID;
  console.log("picture selection userID " + userID);

  const uploadToS3 = async (result) => {

    // const filePath = result.assets[0].uri.replace('file://', '');
    // const { userID } = route.params;
    // const file = {
    //     uri: filePath,
    //     name: userID + ".png",
    //     type: result.assets[0].type
    // };

    // try {
    //     const response = await RNS3.put(file, options);
    //     console.log('AWS S3 Response:', response);
    //   //const data = await s3.upload(params).promise();
    //   //console.log('Image uploaded successfully:', data.Location);
    //   // You can now use data.Location to store the image URL or perform other operations
    // } catch (error) {
    //     console.error('Error uploading image:', error);
    // }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (image) {
      setImage(result);
      
    }
  };

const addProfilePicture = () => {
    console.log(image);
    uploadToS3(image);
    signUp()
    // navigation.navigate("ProfilePage")
}

  return (
    <LinearGradient
    style={styles.gradientContainer}
    locations={[0, 1]}
    colors={[colors.red, colors.pink]}
    >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && <Image source={{ uri: image.assets[0].uri }} style={{ width: 200, height: 200 }} />}
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
