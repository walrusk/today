import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';
 
const myFirebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT,
    storageBucket: process.env.REACT_APP_FIREBASE_PROJECT,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
});

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default new ReduxSagaFirebase(myFirebaseApp);
