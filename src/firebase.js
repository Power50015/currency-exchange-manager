import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_ApiKey,
    authDomain: process.env.VUE_APP_AuthDomain,
    projectId: process.env.VUE_APP_ProjectId,
    storageBucket: process.env.VUE_APP_StorageBucket,
    messagingSenderId: process.env.VUE_APP_MessagingSenderId,
    appId: process.env.VUE_APP_AppId,
    measurementId: process.env.VUE_APP_MeasurementId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;