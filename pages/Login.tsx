import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { connectToDynamoDB } from '../api/aws';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import * as Location from 'expo-location';
import { useCallback } from 'react';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import colors from '../assets/colors/colors';
import * as SplashScreen from 'expo-splash-screen';

const Login = () => {
    // states for handling login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<Location.LocationObject>();
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location.coords)
        })();
      }, []);

    // do things based on whether user is signed in
    onAuthStateChanged(auth, (user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("User is signed in with user id: "  + uid)
        connectToDynamoDB()
        // ...
        } else {
        // User is signed out
        console.log("User is signed out. ;)")
        // ...
        }
    });


    const logIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Logged In!');
        } catch (error: any) {
            console.log(error);
            alert('Sign In Failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            console.log("(" + email  + ")")
            console.log(password)
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Success!');
        } catch (error: any) {
            console.log(error);
            alert('Sign Up Failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const logOut = async() => {
        setLoading(true);
        try {
            const response = await signOut(auth);
            console.log(response);
            alert('Success!');
        } catch (error: any) {
            console.log(error);
            alert('Log out Failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const [fontsLoaded, fontError] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
        'Nunito-Medium': require('../assets/fonts/NunitoSans_10pt-Medium.ttf'),
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      } 

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={{ textAlign: 'center', fontSize: 36, fontWeight: 'bold', marginBottom: 24, fontFamily: 'Inter-Bold' }}>Login</Text>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput value = {email} style={styles.input} autoCapitalize="none" placeholder='Email' onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput value = {password} secureTextEntry = {true} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

                { loading  ? <ActivityIndicator size="large" color = "#0000ff" />
                : <>
                    <Button title="Login" onPress={() => logIn()} />
                    <Button title="Create Account" onPress={() => signUp()} />
                    <Button title="Log Out" onPress={() => logOut()} />
                </>}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});