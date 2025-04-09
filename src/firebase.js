import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
console.log("API KEY:", process.env.REACT_APP_FIREBASE_API_KEY);


require('firebase/compat/auth')
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})
export const auth = app.auth()
export default app
export const storage = getStorage(app);
export const analytics = getAnalytics(app);