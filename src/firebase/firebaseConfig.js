import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfVSo2nNRzZQHkQz32bmhEYF-ei3TM3_Q",
    authDomain: "react-app-cursos-a052a.firebaseapp.com",
    projectId: "react-app-cursos-a052a",
    storageBucket: "react-app-cursos-a052a.appspot.com",
    messagingSenderId: "717544781535",
    appId: "1:717544781535:web:7e0e8b2efce889395f5b6a"
};

// esta es la base de datos
firebase.initializeApp(firebaseConfig);

// para guarda info y el google auth provider
// esta es la referencia a firestore
const db = firebase.firestore();
// esta es mi auth provider
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}