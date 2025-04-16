// Firebase core imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase config — yeh tera working config hai
const firebaseConfig = {
  apiKey: "AIzaSyCZ6LIiBqQApvo2fZAKbWV2cOI27azwTKI",
  authDomain: "notes-app-5bb42.firebaseapp.com",
  projectId: "notes-app-5bb42",
  storageBucket: "notes-app-5bb42.appspot.com", // ✅ FIXED .app to .appspot.com
  messagingSenderId: "243701445153",
  appId: "1:243701445153:web:41d10142e092ef99e06960",
  measurementId: "G-9T03W2ERN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Exports
export const auth = getAuth(app);
export const storage = getStorage(app);

let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  console.warn("Analytics not supported in this environment.");
}
export { analytics };

export default app;
