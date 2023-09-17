import {initializeApp} from "firebase/app"
import {getFirestore, collection} from "firebase/firestore"

initializeApp({
    apiKey: "AIzaSyBcnlto9KUNxBtb5znMibJC-KKUnUbY2TI",
    authDomain: "react-chat---fstore-9.firebaseapp.com",
    projectId: "react-chat---fstore-9",
    storageBucket: "react-chat---fstore-9.appspot.com",
    messagingSenderId: "284610135433",
    appId: "1:284610135433:web:aa4d19e31fcde4dcce4d58",
    measurementId: "G-VX0PHJLX47"
});

const db = getFirestore();
export const dbMsgRef = collection(db, 'messages');

export default db;