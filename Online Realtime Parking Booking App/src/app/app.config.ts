import {AuthMethods, AuthProviders} from 'angularfire2'

export  var config = {
    apiKey: "AIzaSyAOsi08XRH70pTi1MR6qvx7Dw1A393CW20",
    authDomain: "realtime-parking-booking-sys.firebaseapp.com",
    databaseURL: "https://realtime-parking-booking-sys.firebaseio.com",
    storageBucket: "realtime-parking-booking-sys.appspot.com",
    messagingSenderId: "400867840912"
  };
  
  export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};
