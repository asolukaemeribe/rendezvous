import * as React from "react"
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
} from "react-native"
import { Padding, FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
const config = require('../config.json');

const ViewPotentialMatchesPage = ({route, navigation}) => {
    const [nearbyUsersData, setNearbyUsersData] = useState([{}])

    useEffect(() => {
        const { userID, lat, long, rad } = route.params;
        console.log("POT MATCHES PAGE UID: " + userID)
        console.log("POT MATCHES PAGE LAT: " + lat)
        console.log("POT MATCHES PAGE LONG: " + long)
        console.log("POT MATCHES PAGE RAD: " + rad)
    
        fetch(`http://${config.server_host}:${config.server_port}/getusersinradius?uid=${userID}&lat=${lat}&long=${long}&rad=${rad}`)
        .then(res => res.json())
        .then(resJson => {
          console.log("POT MATCHES PAGE resJson: ")
          console.log(resJson)
          setNearbyUsersData(resJson);  
        });
    }, []);

    const Item = ({ id, index }) => (
        <View>
          <Text>
            {id}
          </Text>
        </View>
      );
    
      const renderItem = ({ item, index }) => (
        <Item id={item.id} index={index} />
      );

    return (
        <View style={styles.potentialMatchesPageView}>
            <LinearGradient
            style={styles.pageGradient}
            locations={[0, 0.9]}
            colors={["#ff0000", "#db17a4"]}
            >
                <View style={styles.listContainerWrapper}>
                    {nearbyUsersData && (
                        <FlatList style={styles.listWrapper}
                            data={nearbyUsersData}
                            renderItem={renderItem}
                        />
                    )}
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    potentialMatchesPageView: {
      flex: 1,
      height: 844,
      backgroundColor: "transparent",
      overflow: "hidden",
      width: "100%",
      position: "relative",
    },
    pageGradient: {
        flex: 1,
        // height: 844,
        backgroundColor: "transparent",
        overflow: "hidden",
        width: "100%",
        height: "100%"
      },
    listContainerWrapper: {
        height: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Color.colorWhite,
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      listWrapper: {
        flexDirection: "row",
      }
  });
  
  
  export default ViewPotentialMatchesPage;