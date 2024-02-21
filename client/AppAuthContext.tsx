import * as React from "react";
import createContext from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const AuthContext = React.createContext();


export const AuthContextProvider = (props) => {

  function authReducer(prevAuthState, action) {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        console.log("restore");
        return {
          ...prevAuthState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        console.log("sign in");
        return {
          ...prevAuthState,
          isSignout: false,
          userToken: action.token,
          creatingAccountData: null,
          creatingAccount: false,
        };
      case 'SIGN_OUT':
        console.log("sign out");
        return {
          ...prevAuthState,
          isSignout: true,
          userToken: null,
          creatingAccount: false,
          creatingAccountData: null
        };
      case 'CREATING_ACCOUNT':
        console.log("creatingacc");
        return {
          ...prevAuthState,
          creatingAccount: true
        }
      case 'CREATING_ACCOUNT_DATA':
        console.log(" creating account data now with " + action.accountData)
        return {
          ...prevAuthState,
          creatingAccount: true,
          creatingAccountData: action.accountData,
        }
      default:
        console.log("default")
        return prevAuthState;
    }
  }

  const initialAuthState = {
    isLoading: false,
    isSignout: true,
    userToken: null,
    creatingAccount: false,
    creatingAccountData: "testcreatingaccountdata"
  }

  const [authState, setAuthState] = React.useReducer(authReducer, initialAuthState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // let userToken;
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser;
      // try {
      //   // Restore token stored in `SecureStore` or any other encrypted storage
      //   // userToken = await SecureStore.getItemAsync('userToken');
      // } catch (e) {
      //   // Restoring token failed
      // }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (user) {
        setAuthState({ type: 'RESTORE_TOKEN', token: user.uid });
        console.log("App.tsx Application has started. User is signed in so navigating to profile page of user with uid: " + user.uid)
        // navigation.navigate("ProfilePage", {userID: uid});
      }
      else {
        console.log("Application has started; no user is signed in.")
      }
      // else {
      //   setAuthState({ type: 'SIGN_OUT' });
      //   console.log("Application has started; no user is signed in.")
      // }
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    console.log('app.tsx userToken: ', authState.userToken);
    console.log('app.tsx isAuth: ', authState.isSignout);
    console.log("app.tsx creatingAccountData: ", authState.creatingAccountData);
  }, [authState]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (auth, email, password, location) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          console.log(response);
          const user = auth.currentUser;

          // update location in postgresql db
          fetch(`http://${config.server_host}:${config.server_port}/updateuserlocation?uid=${user.uid}` +
            `&lat=${location.coords.latitude}&long=${location.coords.longitude}`)
            .then(res => { console.log("success! check database. Location should be updated.") })
          setAuthState({ type: 'SIGN_IN', token: user.uid });

          // navigation.navigate("ProfilePage", {userID: user.uid});
          // router.replace("/profileCreation");
          // alert('Logged In!');
        } catch (error: any) {
          console.log(error);
          alert("Sign In Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
      },
      signOut: async (auth) => {
        // setLoading(true);
        try {
          const response = await signOut(auth);
          console.log(response);
          // alert("Success!");
        } catch (error: any) {
          console.log(error);
          alert("Log out Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
        setAuthState({ type: 'SIGN_OUT' });
      },
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        // setLoading(true);
        // try {
        //   console.log("(" + authState.creatingAccountData.email + ")");
        //   console.log(authState.creatingAccountData.password);
        //   const response = await createUserWithEmailAndPassword(
        //     authState.creatingAccountData.auth,
        //     authState.creatingAccountData.email,
        //     authState.creatingAccountData.password
        //   );
        //   console.log(response);
        //   alert("Success!");
        //   const user = authState.creatingAccountData.auth.currentUser;
        console.log("signing up and in user " + authState.creatingAccountData);
        setAuthState({ type: 'SIGN_IN', token: authState.creatingAccountData });
        // } catch (error: any) {
        //   console.log(error);
        //   alert("Sign Up Failed: " + error.message);
        // } finally {
        //   // setLoading(false);
        // }
      },
      creatingAccount: async () => {
        setAuthState({ type: 'CREATING_ACCOUNT' })
      },
      setCreatingAccountData: async (auth, email, password) => {
        try {
          console.log("(" + email + ")");
          console.log(password);
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(response);
          // alert("Success!");
          const user = auth.currentUser;
          console.log("user.uid is " + user.uid);
          setAuthState({ type: 'CREATING_ACCOUNT_DATA', accountData: user.uid })
          // console.log("test: " + authState.creatingAccountData);
          // console.log("Test: " + authState.creatingAccount);
        } catch (error: any) {
          console.log(error);
          alert("Sign Up Failed: " + error.message);
        } finally {
          // setLoading(false);
        }
        return authState;
        // setAuthState({ type: 'CREATING_ACCOUNT_DATA', creatingAccountData: data})
      },
      getCreatingAccountData: () => {
        console.log(authState.creatingAccountData);
        return authState.creatingAccountData;
      },
      getUserID: () => {
        return authState.userToken;
      },
      getAuthState: () => {
        return authState;
      }
    }),
    [authState]
  );

  // const [state, dispatch] = useReducer(
  //     authReducer,
  //     authInitialState
  // );

  // You can choose to wrap this in a useMemo if you want to be extra careful about potential rerenders
  const authContextStore = {
      authState,
      setAuthState,
  }

  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
}

export const useAuthContext = () => React.useContext(AuthContext)


// const AuthContextProvider = props => {
//   const authContext = React.useMemo(
//     () => ({
//       signIn: async (auth, email, password, location) => {
//         // In a production app, we need to send some data (usually username, password) to server and get a token
//         // We will also need to handle errors if sign in failed
//         // After getting token, we need to persist the token using `SecureStore`
//         // In the example, we'll use a dummy token
//         try {
//           const response = await signInWithEmailAndPassword(auth, email, password);
//           console.log(response);
//           const user = auth.currentUser;

//           // update location in postgresql db
//           fetch(`http://${config.server_host}:${config.server_port}/updateuserlocation?uid=${user.uid}` +
//             `&lat=${location.coords.latitude}&long=${location.coords.longitude}`)
//             .then(res => { console.log("success! check database. Location should be updated.") })
//           setAuthState({ type: 'SIGN_IN', token: user.uid });

//           // navigation.navigate("ProfilePage", {userID: user.uid});
//           // router.replace("/profileCreation");
//           // alert('Logged In!');
//         } catch (error: any) {
//           console.log(error);
//           alert("Sign In Failed: " + error.message);
//         } finally {
//           // setLoading(false);
//         }
//       },
//       signOut: async (auth) => {
//         // setLoading(true);
//         try {
//           const response = await signOut(auth);
//           console.log(response);
//           // alert("Success!");
//         } catch (error: any) {
//           console.log(error);
//           alert("Log out Failed: " + error.message);
//         } finally {
//           // setLoading(false);
//         }
//         setAuthState({ type: 'SIGN_OUT' });
//       },
//       signUp: async () => {
//         // In a production app, we need to send user data to server and get a token
//         // We will also need to handle errors if sign up failed
//         // After getting token, we need to persist the token using `SecureStore`
//         // In the example, we'll use a dummy token
//         // setLoading(true);
//         // try {
//         //   console.log("(" + authState.creatingAccountData.email + ")");
//         //   console.log(authState.creatingAccountData.password);
//         //   const response = await createUserWithEmailAndPassword(
//         //     authState.creatingAccountData.auth,
//         //     authState.creatingAccountData.email,
//         //     authState.creatingAccountData.password
//         //   );
//         //   console.log(response);
//         //   alert("Success!");
//         //   const user = authState.creatingAccountData.auth.currentUser;
//         console.log("signing up and in user " + authState.creatingAccountData);
//         setAuthState({ type: 'SIGN_IN', token: authState.creatingAccountData });
//         // } catch (error: any) {
//         //   console.log(error);
//         //   alert("Sign Up Failed: " + error.message);
//         // } finally {
//         //   // setLoading(false);
//         // }
//       },
//       creatingAccount: async () => {
//         setAuthState({ type: 'CREATING_ACCOUNT' })
//       },
//       setCreatingAccountData: async (auth, email, password) => {
//         try {
//           console.log("(" + email + ")");
//           console.log(password);
//           const response = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//           );
//           console.log(response);
//           // alert("Success!");
//           const user = auth.currentUser;
//           console.log("user.uid is " + user.uid);
//           setAuthState({ type: 'CREATING_ACCOUNT_DATA', accountData: user.uid })
//           // console.log("test: " + authState.creatingAccountData);
//           // console.log("Test: " + authState.creatingAccount);
//         } catch (error: any) {
//           console.log(error);
//           alert("Sign Up Failed: " + error.message);
//         } finally {
//           // setLoading(false);
//         }
//         return authState;
//         // setAuthState({ type: 'CREATING_ACCOUNT_DATA', creatingAccountData: data})
//       },
//       getCreatingAccountData: () => {
//         console.log(authState.creatingAccountData);
//         return authState.creatingAccountData;
//       },
//       getUserID: () => {
//         return authState.userToken;
//       },
//       getAuthState: () => {
//         return authState;
//       }
//     }),
//     []
//   );
//     return (
//   <AuthContext.Provider value={}>
//     {props.children}
//   </AuthContext.Provider>
//     )
// }


// // const AppStateProvider = props => {

// //   const contextValue={...yourContext}

// //   return (
// //     <AppStateContext.Provider value={contextValue}>
// //       {props.children}
// //     </AppStateContext.Provider>
// //   );
// // };