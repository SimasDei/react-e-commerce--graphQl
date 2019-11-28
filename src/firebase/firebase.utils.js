import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAXMwuDgdENngg4mtnEuj8oun3anPRwF_o',
  authDomain: 'react-e-commerce-b3899.firebaseapp.com',
  databaseURL: 'https://react-e-commerce-b3899.firebaseio.com',
  projectId: 'react-e-commerce-b3899',
  storageBucket: 'react-e-commerce-b3899.appspot.com',
  messagingSenderId: '893908218173',
  appId: '1:893908218173:web:03a3bb754e85b8a3239554',
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
