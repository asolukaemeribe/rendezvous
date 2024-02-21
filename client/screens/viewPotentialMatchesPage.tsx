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
import AWS from 'aws-sdk';
import { AuthContext } from "../AppAuthContext";

const ViewPotentialMatchesPage = ({route, navigation}) => {
    const [nearbyUsersData, setNearbyUsersData] = useState([{}])
    const [image, setImage] = React.useState(null);
    const { getCreatingAccountData } = React.useContext(AuthContext);
    // const userID = getCreatingAccountData();
    const userID = route.params.userID;
    console.log("view potential matches userID " + userID);

    useEffect(() => {
        const { lat, long, rad } = route.params;
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

  //   useEffect(() => {
  //     const fetchImage = async () => {
  //         try {
  //             const data = await getImage(userID);
  //             setImage(data);
  //         } catch (error) {
  //             console.log('Error fetching image:', error);
  //         }
  //     };

  //     fetchImage();
  // }, []);

    

    AWS.config.update({
      accessKeyId: 'AKIAQZZTHZFDIMFX7CUZ', 
      secretAccessKey: 'a+0QJspoF+imywCYy3+j8q0/luImE2F57nxfa2nE'
    });
    AWS.config.region = "us-east-1";
    
    //var bucket = new AWS.S3({params: {Bucket: 'YOUR_BUCKET'}});
    const s3 = new AWS.S3();

    const getImage = async (key) => {
        try {
            const params = {
                Bucket: 'rendezvousfiles',
                Key: key,
            };

            const data = await s3.getObject(params).promise();
            // Data will contain the image content
            return data.Body;
        } catch (error) {
            console.log('Error retrieving image from S3:', error);
            throw error;
        }
    };

    const Item = ({ id, index }) => (
        //
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
                    {}
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