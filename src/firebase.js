import firebase from "firebase";

const firebaseApp= firebase.initializeApp({
    apiKey            : "AIzaSyAzpQtoBp61H0i4GooLoKAv3kf1oZEq9fc",
    authDomain        : "chat-react-ba518.firebaseapp.com"       ,
    databaseURL       : "https://chat-react-ba518.firebaseio.com",
    projectId         : "chat-react-ba518"                       ,
    storageBucket     : "chat-react-ba518.appspot.com"           ,
    messagingSenderId : "59129776676"                            ,
    appId             : "1:59129776676:web:edc829e3776e54af7e26b1"
  });

  const db = firebaseApp.firestore();

  export default db;