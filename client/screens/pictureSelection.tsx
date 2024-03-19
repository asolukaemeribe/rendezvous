import * as React from "react";

import { Button, Image, View, StyleSheet, Pressable, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/global_styles/color";
const config = require('../config.json');
import AWS from 'aws-sdk';
import { AuthContext } from "../AppAuthContext";
global.Buffer = require('buffer').Buffer;

const PictureSelection = ({ route, navigation }) => {
  const [image, setImage] = React.useState(null);
  const { signIn, signOut, signUp, getCreatingAccountData } = React.useContext(AuthContext)
  const userID = route.params.userID;
  console.log("picture selection userID " + userID);

  const uploadToS3 = async (result) => {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();

    try {
      const fileUri = result.assets[0].uri;
      const imageExt = fileUri.split('.').pop();
      const imageMime = `image/${imageExt}`;
      const binaryImageData = Buffer.from(result.assets[0].base64, 'base64');
      const uploadParams = {
        Bucket: 'rendezvous-files',
        Key: `${userID}` + '.jpeg', // The name to use for the uploaded object
        Body: binaryImageData, // The file data
        ContentType: imageMime
      };
      s3.upload(uploadParams, function(err, data) {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          console.log('File uploaded successfully. ETag:', data.ETag);
        }
      });
    } catch (error) {
      console.error('Error reading file:', error);
    } 
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (result) {
      setImage(result);
      
    }
  };

const addProfilePicture = () => {
    uploadToS3(image);
    signUp();
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
