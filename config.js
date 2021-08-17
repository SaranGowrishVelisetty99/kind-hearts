import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAr8VOHwpF8r7bKu1HuqqGeRYQNxsexEaQ",
  authDomain: "donationapp99007.firebaseapp.com",
  databaseURL: "https://donationapp99007-default-rtdb.firebaseio.com",
  projectId: "donationapp99007",
  storageBucket: "donationapp99007.appspot.com",
  messagingSenderId: "536777609515",
  appId: "1:536777609515:web:9fdc801058338225e2f56e",
  measurementId: "G-V1YY9TM9MG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase.firestore();