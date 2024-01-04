//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// create a component

//https://www.youtube.com/watch?v=nvhUY496sJc see this video if Google sign in is working in debug but not after creating apk


//Ref code from this video: https://www.youtube.com/watch?v=SCaTW8I1DVQ&t=748s
//and if DEVELOPER PROBLEM comes then remove clientID from GoogleSignin.configure();  REF this video: https://www.youtube.com/watch?v=9_laBqTSCbM&t=936s
const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signIn = async () => {
    try {
      console.log('Inside signIn function try block');
      await GoogleSignin.hasPlayServices();
      Alert.alert('hasPlayServices() completed');
      console.log('hasPlayServices() completed');
      const usrInfo = await GoogleSignin.signIn();
      console.log('usrInfo:', usrInfo);
      Alert.alert('Usr Info is:' + usrInfo.user.name);
      console.log('Usr Info is:', usrInfo.user.name);
      setUserInfo(usrInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('SIGN_IN_CANCELLED:');
        alert('SIGN_IN_CANCELLED:');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        alert('IN_PROGRESS:');
        console.log('IN_PROGRESS:');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert('PLAY_SERVICES_NOT_AVAILABLE:');
        console.log('PLAY_SERVICES_NOT_AVAILABLE:');
      } else {
        // some other error happened
        alert('Other problem:' + error);
        console.log('Other problem:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      {userInfo != null && <Text>{userInfo.user.name}</Text>}
      {userInfo != null && <Text>{userInfo.user.email}</Text>}
      {userInfo != null && (
        <Image
          source={{uri: userInfo.user.photo}}
          style={{width: 100, height: 100}}></Image>
      )}
      {userInfo == null ? (
        <Text style={{padding: 20, borderWidth: 1}} onPress={() => signIn()}>
          Google SignIn
        </Text>
      ) : (
        <Text
          style={{padding: 20, borderWidth: 1, marginTop: 30}}
          onPress={() => signOut()}>
          Google SignOut
        </Text>
      )}
      {/*
       */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default App;
