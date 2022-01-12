import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { display } from '@mui/system';

const config = {
  apiKey: "AIzaSyDCD3o38z83yQfyXslC-9HrYiBdirDNNss",
  authDomain: "lax-dashboard-3dc31.firebaseapp.com",
  projectId: "lax-dashboard-3dc31",
  storageBucket: "lax-dashboard-3dc31.appspot.com",
  messagingSenderId: "1005645533421",
  appId: "1:1005645533421:web:68b04b1634e46670c2bce4",
  measurementId: "G-76Y3F1XRS3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, displayName, team, grad = null, position = null) => {
  if (!userAuth) {
    alert('No login')
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  let teamSnapshot;

  if (team) {
    const teamRef = firestore.collection(team);
    teamSnapshot = await teamRef.get();
  }

  const teamUserRef = firestore.doc(`${team}/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if (!snapShot.exists && teamSnapshot !== undefined) {
    if (teamSnapshot.size !== 0) {
      const { email, uid } = userAuth;
      try {
        await userRef.set({
          displayName,
          email,
          isAdmin: false,
          team
        });
        await teamUserRef.set({
          displayName,
          id: uid,
          isAdmin: false
        });
        firestore.collection(team).doc(userAuth.uid).collection('data').doc(userAuth.uid).set({
          agility: null,
          broad: null,
          grad: grad,
          position: position,
          three: null,
          wb: null
        });
        firestore.collection(team).doc(userAuth.uid).collection('links').doc(userAuth.uid).set({
          agilityLink: null,
          broadLink: null,
          threeLink: null,
          wbLink: null,
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;