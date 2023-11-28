import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Border, Color, FontSize, FontFamily } from "./GlobalStyles";

const IPhone13141 = () => {
  return (
    <LinearGradient
      style={styles.iphone13141}
      locations={[0, 1]}
      colors={["#ff0000", "#db17a4"]}
    >
      <View style={[styles.iphone13141Child, styles.iphone13141Layout]} />
      <View style={[styles.iphone13141Item, styles.iphone13141Layout]} />
      <Text style={styles.login}>Login</Text>
      <View style={[styles.iphone13141Inner, styles.iphone13141Layout]} />
      <Image
        style={[styles.ellipseIcon, styles.ellipseIconLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-1.png")}
      />
      <Image
        style={[styles.iphone13141Child1, styles.ellipseIconLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-2.png")}
      />
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <Image
        style={[styles.vectorIcon1, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      />
      <Text style={[styles.username, styles.usernameTypo]}>Username</Text>
      <Text style={[styles.password, styles.usernameTypo]}>Password</Text>
      <Image
        style={styles.layer1Icon}
        contentFit="cover"
        source={require("../assets/layer-1.png")}
      />
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/group.png")}
      />
      <Text
        style={[styles.forgotPasswordusername, styles.dontHaveAnContainerTypo]}
      >
        Forgot password/username?
      </Text>
      <Text
        style={[styles.dontHaveAnContainer, styles.dontHaveAnContainerTypo]}
      >
        <Text style={styles.dontHaveAn}>{`Dont have an account? `}</Text>
        <Text style={styles.signUpHere}>Sign up here</Text>
      </Text>
      <Image
        style={styles.image2Icon}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iphone13141Layout: {
    height: 45,
    width: 249,
    borderRadius: Border.br_3xs,
    left: 71,
    position: "absolute",
  },
  ellipseIconLayout: {
    width: 45,
    left: 60,
    height: 45,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  usernameTypo: {
    color: Color.colorGray_200,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  dontHaveAnContainerTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  iphone13141Child: {
    borderColor: Color.colorWhite,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    width: 249,
    borderRadius: Border.br_3xs,
    left: 71,
    top: 437,
  },
  iphone13141Item: {
    top: 555,
    backgroundColor: Color.colorBlue,
    width: 249,
    borderRadius: Border.br_3xs,
    left: 71,
  },
  login: {
    top: 568,
    left: 161,
    fontSize: 24,
    textAlign: "left",
    lineHeight: 20,
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    position: "absolute",
  },
  iphone13141Inner: {
    borderColor: "#fbf7f7",
    top: 368,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    width: 249,
    borderRadius: Border.br_3xs,
    left: 71,
  },
  ellipseIcon: {
    top: 368,
  },
  iphone13141Child1: {
    top: 437,
  },
  vectorIcon: {
    height: "2.52%",
    top: "44.91%",
    bottom: "52.57%",
    left: "18.21%",
    right: "76.33%",
    width: "5.46%",
    maxWidth: "100%",
  },
  vectorIcon1: {
    height: "3.32%",
    top: "52.49%",
    bottom: "44.19%",
    left: "18.21%",
    right: "76.33%",
    width: "5.46%",
    maxWidth: "100%",
  },
  username: {
    top: 380,
    left: 164,
  },
  password: {
    top: 450,
    left: 165,
  },
  layer1Icon: {
    top: 45,
    left: 77,
    width: 238,
    height: 293,
    position: "absolute",
    overflow: "hidden",
  },
  groupIcon: {
    height: "4.15%",
    width: "57.62%",
    top: "35.9%",
    right: "19.79%",
    bottom: "59.95%",
    left: "22.59%",
  },
  forgotPasswordusername: {
    top: 498,
    left: 166,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
  },
  dontHaveAn: {
    color: Color.colorWhite,
  },
  signUpHere: {
    color: Color.colorBlue,
  },
  dontHaveAnContainer: {
    top: 637,
    left: 100,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
  },
  image2Icon: {
    top: 657,
    left: 0,
    width: 402,
    height: 257,
    position: "absolute",
  },
  iphone13141: {
    flex: 1,
    width: "100%",
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default IPhone13141;
