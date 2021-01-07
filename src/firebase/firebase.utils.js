import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCDD7ZwYvV7Kq71JayTei2j0jvyJDnCFhY',
  authDomain: 'crwn-db-e2485.firebaseapp.com',
  projectId: 'crwn-db-e2485',
  storageBucket: 'crwn-db-e2485.appspot.com',
  messagingSenderId: '796074878404',
  appId: '1:796074878404:web:096df5049a7c807b3db091',
  measurementId: 'G-CXEV5HF04L',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
