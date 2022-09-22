import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFz1nIYfNND0wIWhjX3AEJ4f8Gy-INVAs",
  authDomain: "crwn-clothing-db-d742e.firebaseapp.com",
  projectId: "crwn-clothing-db-d742e",
  storageBucket: "crwn-clothing-db-d742e.appspot.com",
  messagingSenderId: "807855917809",
  appId: "1:807855917809:web:3b5ef00f5463bccaf0b750",
};

// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);

// setting up authentication provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// used to store the data in firebase authentication
export const auth = getAuth();

// sign in methods and storing in firebase authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// export

// used for firebase firestore
export const db = getFirestore();

// storing user data to firestore from firebase authentication
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("doc", userDocRef);

  // snapshot the user data from firestore db
  const userSnapshot = await getDoc(userDocRef);

  // checking to see if user data exist in google authentication record
  if (!userSnapshot.exists()) {
    // get the specific records from cached record to display in firestore
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // storing the specific record from cached records
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
