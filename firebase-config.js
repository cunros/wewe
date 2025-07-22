import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEhPhjnPeZR3a9gP_9Hrl_tbZ5lOkCqew",
  authDomain: "snakegame-fa0d4.firebaseapp.com",
  projectId: "snakegame-fa0d4",
  storageBucket: "snakegame-fa0d4.appspot.com",
  messagingSenderId: "784708945540",
  appId: "1:784708945540:web:2c672219ee458aa51ee4d1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
