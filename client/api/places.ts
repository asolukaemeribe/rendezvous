import * as Location from "expo-location";

const API_KEY = 'AIzaSyAMpsMvEMhoyQnGueshi2sRbMZjqzTB8R8';

// Use `Location` directly without accessing `Location.LocationObject()`
let locationObj: Location.LocationObject;
(async () => {
    locationObj = await Location.getCurrentPositionAsync({});
    console.log("LOCATION profilePage: ");
    console.log(locationObj.coords);
})();

export async function fetchPlacesNearby(latitude = null, longitude = null, radius = null) {
    // Move the location assignment inside the `fetchPlacesNearby` function
    const innerLocation = locationObj;
    const lat = latitude !== null ? latitude : innerLocation.coords.latitude;
    const long = longitude !== null ? longitude : innerLocation.coords.longitude;
    const location = lat + ' ' + long;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching places:', error);
        throw error;
    }
}
