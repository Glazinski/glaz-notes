import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyD_qSLnpe3F1q1yWkCn7Q9Bj0xEIORpPSw',
  authDomain: 'glaz-notes-269221.firebaseapp.com',
  databaseURL: 'https://glaz-notes-269221.firebaseio.com',
  projectId: 'glaz-notes-269221',
  storageBucket: 'glaz-notes-269221.appspot.com',
  messagingSenderId: '19177634472',
  appId: '1:19177634472:web:978055892a8fd4a014e09d',
  measurementId: 'G-3GZBW0H89B',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
