import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-69roDbdu464MDeg6O7lwwQh_HrMuY40",
  authDomain: "drivemateapk.firebaseapp.com",
  projectId: "drivemateapk",
  storageBucket: "drivemateapk.firebasestorage.app",
  messagingSenderId: "278449897676",
  appId: "1:278449897676:web:26104dd3e94ce2c7374269",
  measurementId: "G-1Y4DCQ4T54"
};

const app = initializeApp(firebaseConfig);

window.driveMateFirebaseApp = app;

const isHttpLike = window.location.protocol === "http:" || window.location.protocol === "https:";

if (isHttpLike) {
  isSupported()
    .then((supported) => {
      if (supported) {
        window.driveMateAnalytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn("Firebase Analytics initialization skipped:", error);
    });
}
