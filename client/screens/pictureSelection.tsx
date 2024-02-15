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

import { RNS3 } from 'react-native-aws3';



const PictureSelection = ({ route, navigation }) => {
  const [image, setImage] = React.useState(null);

  const uploadToS3 = async (result) => {
    //const s3 = new AWS.S3();
    // const key = `images/${Date.now()}-${Math.floor(Math.random() * 10000)}.jpg`;
    // AWS.config.update({
    //     accessKeyId: 'AKIAQZZTHZFDIMFX7CUZ',
    //     secretAccessKey: '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',
    //     region: 'us-east-1',
    //     maxRetries: 3,
    //     httpOptions: {timeout: 30000, connectTimeout: 5000},
    //   });

    
    
    // const params = {
    //   //keyPrefix: "uploads/",
    //   bucket: "rendezvousfiles",
    //   region: "us-east-1",
    //   accessKey: "AKIAQZZTHZFDIMFX7CUZ",
    //   secretKey: "a+0QJspoF+imywCYy3+j8q0/luImE2F57nxfa2nE",
    //   successActionStatus: 201
    // }

    const filePath = result.assets[0].uri.replace('file://', '');
    const { userID } = route.params;
    const file = {
        uri: filePath,
        name: userID + ".png",
        type: result.assets[0].type
    };

    const options = {
        //keyPrefix: 'uploads/', // Replace with your S3 bucket path
        bucket: 'rendezvousfiles',
        region: 'us-east-1',
        accessKey: 'AKIAQZZTHZFDIMFX7CUZ',
        secretKey: 'a+0QJspoF+imywCYy3+j8q0/luImE2F57nxfa2nE',
        successActionStatus: 201,
    };

    try {
        const response = await RNS3.put(file, options);
        console.log('AWS S3 Response:', response);
      //const data = await s3.upload(params).promise();
      //console.log('Image uploaded successfully:', data.Location);
      // You can now use data.Location to store the image URL or perform other operations
    } catch (error) {
        console.error('Error uploading image:', error);
    }
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
    const { userID } = route.params;
    console.log(image);
    uploadToS3(image);
    navigation.navigate("ProfilePage", {userID: userID})
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