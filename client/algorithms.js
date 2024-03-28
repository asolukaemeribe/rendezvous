import * as Location from "expo-location";
import profileLocationData from "../assets/data/profileLocationData.ts";
import profilePreferenceData from "../assets/data/profilePreferenceData.ts";
import dummyUserIds from "../assets/data/dummyUserIds.ts";
import { fetchPlacesNearby } from "./api/places";

const distanceWeight = .25;
const sharedInterestsWeight = .25;
const personalityWeight = .25;
const lookingForWeight = .25;

let userInterests;
let userLookingFor;
let userPersonalityType;
let userLat;
let userLong;
let preferenceList = [];
let distanceMap = new Map();
let sharedInterestsMap = new Map();
let personalityCompatibilityMap = new Map();

const { userID } = route.params;

// Use `Location` directly without accessing `Location.LocationObject()`
let locationObj;
(async () => {
    locationObj = await Location.getCurrentPositionAsync({});
    userLat = locationObj.coords.latitude;
    userLong = locationObj.coords.longitude;
})();

fetch(`http://${config.server_host}:${config.server_port}/user/${userID}`)
    .then(res => res.json())
    .then(resJson => {
        userLookingFor = resJon.looking_for;
        userInterests = resJson.interests;
        userPersonalityType = resJson.personalityType;
    });

// 0.2 = Uh-Oh Think This One Through
// 0.4 = It Could Work, But Not Ideal
// 0.6 = One Sided Match
// 0.8 = It's Got a Good Chance
// 1.0 = Often Listed as an Ideal Match

const compatibilityList = {
    'INFP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ENFP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'INFJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ENFJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'INTJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ENTJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'INTP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ENTP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ISFP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ESFP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ISTP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ESTP': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ISFJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ESFJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ISTJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
    'ESTJ': {
        'INFP': 1.0, 'ENFP': 0.8, 'INFJ': 0.7, 'ENFJ': 0.6,
        'INTJ': 0.9, 'ENTJ': 0.7, 'INTP': 0.6, 'ENTP': 0.5,
        'ISFP': 0.8, 'ESFP': 0.6, 'ISTP': 0.5, 'ESTP': 0.4,
        'ISFJ': 0.7, 'ESFJ': 0.5, 'ISTJ': 0.4, 'ESTJ': 0.3
    },
};


const lookingForList = {
    'Short Term': {
        'Short Term': 1.0,
        'Long Term': 0.2,
        'New Friends': 0.5,
        'No Preference': 1.0,
    },
    'Long Term': {
        'Short Term': 0.2,
        'Long Term': 1.0,
        'New Friends': 0.5,
        'No Preference': 1.0,
    },
    'New Friends': {
        'Short Term': 0.0,
        'Long Term': 0.0,
        'New Friends': 1.0,
        'No Preference': 1.0,
    },
    'No Preference': {
        'Short Term': 1.0,
        'Long Term': 1.0,
        'New Friends': 1.0,
        'No Preference': 1.0,
    },
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
}

function calculateDistanceMagnitude(lat1, lon1, lat2, lon2) {
    const EARTH_RADIUS = 6371e3; // Earth radius in meters
    const phi1 = lat1 * Math.PI / 180; // φ, λ in radians
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = EARTH_RADIUS * c; // Distance in meters
    return distance;
}

// Function to count the number of shared interests between two users
function countSharedInterests(user1, user2) {
    let count = 0;
    for (const interest in user1.profileInfo['Interests'].info) {
        if (user1.profileInfo['Interests'].info[interest] && user2.profileInfo['Interests'].info[interest]) {
            count++;
        }
    }
    return count;
}

function formUserPreferenceList(inputUserId, orientation) {
    //Creating map for Distance Magnitude Scoring
    profileLocationData.forEach(neighbor => {
        const distanceMagnitude = calculateDistanceMagnitude(
            neighbor.latitude, neighbor.longitude,
            userLat, userLong
        );
        distanceMap.set(neighbor.id, distanceMagnitude);
    });

    let minDistanceKey = null;
    let minDistanceValue = Infinity;
    let maxDistanceKey = null;
    let maxDistanceValue = -Infinity;
    for (const [key, value] of distanceMap.entries()) {
        if (value < minDistanceValue) {
            minDistanceValue = value;
            minDistanceKey = key;
        }

        if (value > maxDistanceValue) {
            maxDistanceValue = value;
            maxDistanceKey = key;
        }
    }

    //Creating map for Similarity Scoring
    profilePreferenceData.forEach(neighbor => {
        const similarityScore = countSharedInterests(user, neighbor);
        sharedInterestsMap.set(neighbor.id, similarityScore);
    });

    let maxSimilarityScore = -Infinity;
    let minSimilarityScore = Infinity;
    let mostSimilarUserId = null;
    let leastSimilarUserId = null;

    sharedInterestsMap.forEach((userId, score) => {
        if (score > maxSimilarityScore) {
            maxSimilarityScore = score;
            mostSimilarUserId = userId;
        }
        if (score < minSimilarityScore) {
            minSimilarityScore = score;
            leastSimilarUserId = userId;
        }
    });

    //Creating map for personality compatibility scoring
    profilePreferenceData.forEach(neighbor => {
        const personalityScore = compatibilityList[neighbor['Personality Type'].info][userPersonalityType]
        personalityCompatibilityMap.set(neighbor.id, personalityScore);
    });

    let minCompatibilityKey = null;
    let minCompatibilityValue = Infinity;
    let maxCompatibilityKey = null;
    let maxCompatibilityValue = -Infinity;
    for (const [key, value] of personalityCompatibilityMap.entries()) {
        if (value < minCompatibilityValue) {
            minCompatibilityValue = value;
            minCompatibilityKey = key;
        }

        if (value > maxCompatibilityValue) {
            maxCompatibilityValue = value;
            maxCompatibilityKey = key;
        }
    }
    

    for (var i = 0; i < dummyUserIds.length; i++){
        let a = normalize(distanceMap[i], minDistanceValue, maxDistanceValue);
        let b = normalize(sharedInterestsMap[i], minSimilarityScore, maxSimilarityScore);
        let c = personalityCompatibilityMap[i];
        let d = lookingForList[i];

        preferenceList.push([dummyUserIds[i], 
            distanceWeight*a + sharedInterestsWeight*b
            + personalityWeight*c + lookingForWeight*d]);
    }

    return preferenceList;
}

function userMatchmaking() {
    let maleUserIds = [];
    let femaleUserIds = [];
    const maleUserPreferences = new Map();
    const femaleUserPreferences = new Map();

    maleUserIds.forEach(key => {
        // Set the key-value pair in the map
        maleUserPreferences.set(key, formUserPreferenceList(key, "heterosexual"));
    });

    femaleUserIds.forEach(key => {
        // Set the key-value pair in the map
        femaleUserPreferences.set(key, formUserPreferenceList(key, "heterosexual"));
    });

    const maleProposals = {};
    const femaleMatches = {};

    // Initialize each participant's list of potential matches to be empty
    Object.keys(malePreferences).forEach(male => {
        maleProposals[male] = [];
    });

    // While there are unmatched males
    while (Object.keys(maleProposals).length > 0) {
        // Iterate through each male
        for (const male in maleProposals) {
            // Get the male's preference list
            const preferences = malePreferences[male];

            // Iterate through the male's preference list
            for (let i = 0; i < preferences.length; i++) {
                const female = preferences[i];

                // If the female has not rejected the male
                if (!femaleMatches.hasOwnProperty(female) || !femaleMatches[female].includes(male)) {
                    // Propose to the female
                    maleProposals[male].push(female);

                    // If the female has not rejected the male previously
                    if (!femaleMatches.hasOwnProperty(female)) {
                        femaleMatches[female] = [];
                    }

                    // Add the male to the female's list of potential matches
                    femaleMatches[female].push(male);
                    break;
                }
            }

            // Remove the male from the list of unmatched males if he has proposed to all females
            if (maleProposals[male].length === preferences.length) {
                delete maleProposals[male];
            }
        }
    }

    return femaleMatches;

}

function locationSuggestion(neighborLocation, neighborInterestSet) {
    function filterPlacesByType(placesData, types) {
        return placesData.filter(place => {
            return place.types.some(placeType => types.includes(placeType));
        });
    }

    const midWayLat = (userLat + neighborLocation.location.lat) / 2;
    const midWayLong = (userLong + neighborLocation.location.lon) / 2;

    const typesToFilter = ['amusement_park', //
                            'aquarium', 
                            'art_gallery', 
                            'bakery', 
                            'bar', 
                            'beauty_salon',
                            'book_store', 
                            'bowling_alley', 
                            'cafe', 
                            'casino', 
                            'campground',
                            'city_hall', 
                            'clothing_store',
                            'florist',
                            'gym',
                            'library', 
                            'movie_theater', 
                            'museum', 
                            'painter', 
                            'night_club', 
                            'park', 
                            'restaurant', 
                            'shopping_mall', 
                            'spa', 
                            'tourist_attraction', 
                            'zoo', 
                            'food'];

    const preferenceToPlaceMap = {
        "Movies" : ["movie_theater"],
        "Books" :  ["book_store", "library"],
        'Gambling' : ['casino'],
        'Fashion' : ['shopping_mall'],
        'Flora' : ['florist', 'park'],
        'Animals' : ['aquarium', 'zoo', 'park'],
        'Shopping' : ['clothing_store', 'shopping_mall'],
        'History' : ['art_gallery', 'museum', 'tourist_attraction'],
        'Art' : ['art_gallery', 'museum', 'tourist_attraction'],
        'Nightlife' : ['bar', 'casino', 'night_club'],
        'Outdoors' : ['campground', 'park', 'tourist_attraction', 'zoo'],
        'Photography' : ['campground', 'park', 'tourist_attraction', 'art_gallery', 'museum', 'tourist_attraction'],
        'Camping' : ['campground', 'park'],
        'Bowling' : ['bowling_alley'],
    };

    
    const placesData = fetchPlacesNearby(midWayLat, midWayLong, 35000);

    const mutualInterestsSet = Set();
    // const neighborInterestSet = null;
    const mutualInterests = Array.from(neighborInterestSet).filter(value => userInterests.has(value));

    mutualInterests.forEach(interest => {
        // Check if the interest is a key in preferenceToPlaceMap
        if (preferenceToPlaceMap.hasOwnProperty(interest)) {
            // Get the array of strings corresponding to the interest
            const places = preferenceToPlaceMap[interest];
            // Add each string from the array to the mutualInterestsSet
            places.forEach(place => mutualInterestsSet.add(place));
        }
    });
    
    const mutualInterestsArray = [...mutualInterestsSet];
    const filteredPlaces = filterPlacesByType(placesData, mutualInterestsArray);

    return filteredPlaces;

}