import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyDCD3o38z83yQfyXslC-9HrYiBdirDNNss",
  authDomain: "lax-dashboard-3dc31.firebaseapp.com",
  projectId: "lax-dashboard-3dc31",
  storageBucket: "lax-dashboard-3dc31.appspot.com",
  messagingSenderId: "1005645533421",
  appId: "1:1005645533421:web:68b04b1634e46670c2bce4",
  measurementId: "G-76Y3F1XRS3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;