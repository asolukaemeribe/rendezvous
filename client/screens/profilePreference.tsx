import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";

const IPhone13145 = () => {
  return (
    <LinearGradient
      style={styles.iphone13145}
      locations={[0, 1]}
      colors={["#ff0000", "#db17a4"]}
    >
      <Text style={[styles.letsGetTo, styles.continueFlexBox]}>
        Let’s Get to Know You!
      </Text>
      <View style={styles.iphone13145Child} />
      <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <View style={styles.frameParent}>
        <View style={styles.lookingForParent}>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Looking For
          </Text>
          <View style={styles.frameGroup}>
            <View style={[styles.shortTermWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.shortTerm, styles.shortTermTypo]}>
                Short Term
              </Text>
            </View>
            <View style={[styles.frame, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                Long Term
              </Text>
            </View>
            <View style={[styles.frame, styles.wrapperFlexBox]}>
              <Text style={[styles.shortTerm, styles.shortTermTypo]}>
                New Friends
              </Text>
            </View>
            <View style={[styles.frame, styles.wrapperFlexBox]}>
              <Text style={[styles.noPreference, styles.shortTermTypo]}>
                No Preference
              </Text>
            </View>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Interests
          </Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectInterests, styles.selectTypo]}>
              - Select Interests -
            </Text>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Personality Type
          </Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectPersonality, styles.selectTypo]}>
              - Select Personality -
            </Text>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>Zodiac</Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectZodiac, styles.selectTypo]}>
              - Select Zodiac -
            </Text>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Languages
          </Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectPersonality, styles.selectTypo]}>
              - Select Language -
            </Text>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>Religion</Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectInterests, styles.selectTypo]}>
              - Select Religion -
            </Text>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Race/Ethnicity
          </Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectRace, styles.selectTypo]}>
              - Select Race -
            </Text>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Education
          </Text>
          <View style={styles.frameGroup}>
            <View style={[styles.inCollegeWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                In College
              </Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.inGradSchool, styles.longTermTypo]}>
                In Grad School
              </Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                No College
              </Text>
            </View>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>Vices</Text>
          <View style={styles.frameParent1}>
            <View style={[styles.inCollegeWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>None</Text>
            </View>
            <View style={[styles.lightSmokerWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                Light Smoker
              </Text>
            </View>
            <View style={[styles.lightSmokerWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.frequentSmoker, styles.longTermTypo]}>
                Frequent Smoker
              </Text>
            </View>
            <View style={[styles.lightSmokerWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                Light Drinker
              </Text>
            </View>
            <View style={[styles.lightSmokerWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.frequentSmoker, styles.longTermTypo]}>
                Frequent Drinker
              </Text>
            </View>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>
            Dietary Preference
          </Text>
          <View style={styles.frameParent2}>
            <View style={[styles.inCollegeWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>None</Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                Vegetarian
              </Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>Vegan</Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>Halal</Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>
                Pescatarian
              </Text>
            </View>
            <View style={[styles.inGradSchoolWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.longTerm, styles.longTermTypo]}>Kosher</Text>
            </View>
          </View>
          <Text style={[styles.lookingFor, styles.longTermTypo]}>Pets</Text>
          <View style={[styles.vectorParent, styles.wrapperFlexBox]}>
            <Image
              style={styles.vectorIcon1}
              contentFit="cover"
              source={require("../assets/vector1.png")}
            />
            <Text style={[styles.selectRace, styles.selectTypo]}>
              - Select Pets -
            </Text>
          </View>
        </View>
        <View style={[styles.continueWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.continue, styles.continueFlexBox]}>
            Continue
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  continueFlexBox: {
    textAlign: "left",
    color: Color.colorWhite,
  },
  longTermTypo: {
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.colorWhite,
    lineHeight: 50,
  },
  wrapperFlexBox: {
    padding: Padding.p_3xs,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Border.br_3xs,
  },
  shortTermTypo: {
    color: Color.colorSnow,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    lineHeight: 50,
  },
  selectTypo: {
    marginLeft: 10,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.colorWhite,
    lineHeight: 50,
  },
  letsGetTo: {
    height: "8.06%",
    width: "88.46%",
    top: "7.58%",
    left: "7.18%",
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    lineHeight: 50,
    color: Color.colorWhite,
    position: "absolute",
  },
  iphone13145Child: {
    top: 934,
    left: 511,
    alignItems: "center",
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    height: 32,
    width: 89,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
    position: "absolute",
  },
  vectorIcon: {
    height: "2.41%",
    width: "2.97%",
    top: "3.85%",
    right: "90.23%",
    bottom: "93.74%",
    left: "6.79%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  lookingFor: {
    fontSize: FontSize.size_xl,
  },
  shortTerm: {
    fontSize: FontSize.size_xs,
  },
  shortTermWrapper: {
    width: 85,
    padding: Padding.p_3xs,
    justifyContent: "center",
    height: 32,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
  },
  longTerm: {
    fontSize: FontSize.size_xs,
  },
  frame: {
    marginLeft: 5,
    width: 85,
    padding: Padding.p_3xs,
    justifyContent: "center",
    height: 32,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
  },
  noPreference: {
    fontSize: FontSize.size_2xs,
  },
  frameGroup: {
    flexDirection: "row",
  },
  vectorIcon1: {
    width: 13,
    height: 7,
  },
  selectInterests: {
    fontSize: FontSize.size_xs,
  },
  vectorParent: {
    width: 150,
    height: 32,
    padding: Padding.p_3xs,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
  },
  selectPersonality: {
    fontSize: FontSize.size_2xs,
  },
  selectZodiac: {
    fontSize: 13,
  },
  selectRace: {
    fontSize: FontSize.size_sm,
  },
  inCollegeWrapper: {
    justifyContent: "center",
    padding: Padding.p_3xs,
    height: 32,
    width: 89,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
  },
  inGradSchool: {
    fontSize: FontSize.size_2xs,
  },
  inGradSchoolWrapper: {
    marginLeft: 8,
    justifyContent: "center",
    padding: Padding.p_3xs,
    height: 32,
    width: 89,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
  },
  lightSmokerWrapper: {
    marginLeft: 7,
    justifyContent: "center",
    padding: Padding.p_3xs,
    height: 32,
    width: 89,
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_300,
  },
  frequentSmoker: {
    fontSize: FontSize.size_3xs,
  },
  frameParent1: {
    height: 33,
    flexDirection: "row",
    width: 362,
  },
  frameParent2: {
    flexDirection: "row",
    width: 362,
    height: 32,
  },
  lookingForParent: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  continue: {
    fontSize: 15,
    lineHeight: 30,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
  },
  continueWrapper: {
    top: 916,
    left: 237,
    backgroundColor: Color.colorBlue,
    width: 100,
    height: 40,
    justifyContent: "center",
    padding: Padding.p_3xs,
    position: "absolute",
  },
  frameParent: {
    top: 122,
    left: 28,
    height: 722,
    width: 362,
    position: "absolute",
  },
  iphone13145: {
    flex: 1,
    width: "100%",
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default IPhone13145;
