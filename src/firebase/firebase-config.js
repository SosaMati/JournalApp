import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB8S8NweAqGbBrQmm-V4C6ODa2Hps8ioV8",
    authDomain: "react-app-cursos-9814f.firebaseapp.com",
    projectId: "react-app-cursos-9814f",
    storageBucket: "react-app-cursos-9814f.appspot.com",
    messagingSenderId: "510701477440",
    appId: "1:510701477440:web:2be750cd411f3dbf3c49a5"
  };


// const firebaseConfig = { 
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID, 
//     appId: process.env.REACT_APP_APPID,
// };


// const firebaseConfigTestin = {
//     apiKey: "AIzaSyC67owa_5Pb3C-wMdJ6a9Uu0_mV1CgWDHw",
//     authDomain: "test-journal-app-cc723.firebaseapp.com",
//     projectId: "test-journal-app-cc723",
//     storageBucket: "test-journal-app-cc723.appspot.com",
//     messagingSenderId: "1090142762069",
//     appId: "1:1090142762069:web:f13d595833b6dcd50510dc"
// };


// if( process.env.NODE_ENV === 'test' ) { //si estamos en el entorno de test usamos el de testin 
//     firebase.initializeApp(firebaseConfigTestin);
// } else {
//     firebase.initializeApp(firebaseConfig); //si no usamos el de produccion/desarrollo
// };

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore(); //es la base de datos de firebase
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //es el proveedor de autenticacion de google

export {
    db,
    googleAuthProvider,
    firebase
}

