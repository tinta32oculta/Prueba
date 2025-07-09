import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8G8Yce0-uUgLogU46xc0_naZolW3AsDg",
  authDomain: "crud-notas-vue-a2ea2.firebaseapp.com",
  projectId: "crud-notas-vue-a2ea2",
  storageBucket: "crud-notas-vue-a2ea2.firebasestorage.app",
  messagingSenderId: "656727766403",
  appId: "1:656727766403:web:7f7a1f33d9ce41910e32b6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};