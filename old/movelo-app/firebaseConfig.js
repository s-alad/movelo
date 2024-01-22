import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAj4aMuFuy6TH7fpeA11XgwdzAMYUye7s",
    authDomain: "movelo-401303.firebaseapp.com",
    projectId: "movelo-401303",
    storageBucket: "movelo-401303.appspot.com",
    messagingSenderId: "671881317190",
    appId: "1:671881317190:web:84561ec1e9cdf41092f347",
    measurementId: "G-YM1V7K175P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);