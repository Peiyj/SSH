import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, StatusBar, Button, Alert,Platform } from 'react-native';
import GoogleSignInButton from '../View/GoogleSignInButton';
import firebase from 'firebase';
import { Google, Constants } from 'expo';
import { GoogleSignIn } from 'expo-google-sign-in';
import { AppAuth } from 'expo-app-auth';

const webClientId = Platform.select({
  android: "294694508822-uotjg9q0e8545747tpketffgobisa6nj.apps.googleusercontent.com"
});

const { OAuthRedirect, URLSchemes } = AppAuth;

const isInExpoClient = Constants.appOwnership === 'expo';

/*
 * Redefine this one with your client ID
 *
 * The iOS value is the one that really matters,
 * on Android this does nothing because the client ID
 * is read from the google-services.json.
 */
const standaloneClientId = Platform.select({
  android: 'does not matter',
  ios: '356347240170-90djqnqr00qn7i23nefe52gqsalbeqni.apps.googleusercontent.com',
});

export default class LogInPage extends React.Component{
	
	//this function will navigator to CreateProfile1Page
	navigateToHome = () => {
		Alert.alert(
			'Logged In',
			'',
			[{text: 'Okay'}],
			{cancelable: false},
		)
		let userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
		var getDoc = userRef.get().then(doc => {
			if (!doc.exists) {
				this.props.navigation.navigate('CreateProfile1Page');
			} else {
				this.props.navigation.navigate('TabNavigator');
			}
		});
		
	}

  // Log in with Google. 
  googleLogin = async () => {
    try {

			var result;
			var user;
			var userAuth;
			if (isInExpoClient) {
				result = await Google.logInAsync({
					// Client IDs, needed to be created on Google Developers Console.
					behavior: 'web',
					clientId: "294694508822-hfqkhpg9mch5dp4k87um6ri6ka8vj5kg.apps.googleusercontent.com",
					webClientId,
				})
				user = result.user;
				userAuth = result;
			} else {
				await GoogleSignIn.askForPlayServicesAsync();
				result = await GoogleSignIn.signInAsync();
				user = result.user;
				userAuth = await user.refreshAuth();
			}

      if (result.type === "success") {
				// If user is a UCSD user, also log into firebase to access data. 
        if (user.email.endsWith("@ucsd.edu")) {
					Alert.alert(
						'Logging In with UCSD',
						'',
						[{text: 'Okay'}],
						{cancelable: false},
					)
					const credential = firebase.auth.GoogleAuthProvider.credential(userAuth.idToken, userAuth.accessToken);
					firebase.auth().signInAndRetrieveDataWithCredential(credential)
					.then(() => this.navigateToHome())
					.catch((e) => {
						Alert.alert(
							'Database Authentication Failed',
							'Please try again later. Message: ' + e.message,
							[{text: 'Okay'}],
							{cancelable: false},
						)
					});
        } else {
					Alert.alert(
						'Unauthorized Account',
						'The account you attempt to login with was not an UCSD registered account',
						[{text: 'Okay'}],
						{cancelable: false},
					)
				}
      } else {
				// log in cancelled
				Alert.alert(
					'Authentication Failed',
					'Please try again later. ',
					[{text: 'Okay'}],
					{cancelable: false},
				)
      }
		} catch (e) {
			// log in error
			Alert.alert(
				'Unexpected Error',
				'Please try again later. Error message: ' + e.message,
				[{text: 'Okay'}],
				{cancelable: false},
			)
		}
  }

  componentDidMount = async () => {
		try {
      await GoogleSignIn.initAsync({
        isOfflineEnabled: true,
        isPromptEnabled: true,
        clientId: standaloneClientId,
			});
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
		}
		
    // Set up notification for logging into firebase. 
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
			// This is perhaps useful to retain a log in across different app sessions. 
			// For example, I am logged in. I close the app. I open the app again. I expect myself to be logged in. 
			// So that I don't need to log in every time I start the app. 
			// Since iOS does shuts down app for extra memory, this could be user friendly. 
			// Firebase handles this automagically. It changes the user authorization state soon after initialization. 
			if (user) {
				console.log("state changed with logged in user: " + firebase.auth().currentUser.email);
				//this.navigateToHome();
			} else {
			}
		});
  }

  componentWillUnmount() {
    // Remove notification for logging into firebase. 
    this.authSubscription();
  }


  render = () => {
    
		return(
			<View style={styles.logInPage}>
				<StatusBar backgroundColor="#2ea9df"/>
				<Image style={styles.appLogo} 
					source={require('../View/assets/appLogo.png')}/> 
				<GoogleSignInButton onPress={() => this.googleLogin()} />

			</View>
		);
	}
}

const {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
	logInPage: {
		flex:1,
		backgroundColor: '#2ea9df',
		alignItems: 'center',
		justifyContent: 'center',
	
	},

	appLogo:{
    	width: width / 3,
    	height: width / 3,
    	margin: 30,
	}
});
