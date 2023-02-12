import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from './FireBaseConfig';

const registerUser = (
  email: string,
  password: string,
) => createUserWithEmailAndPassword(auth, email, password);

const loginUser = (
  email: string,
  password: string,
) => signInWithEmailAndPassword(auth, email, password);

const logOutUser = () => auth.signOut();

const logInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChanges: (value: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    handleAuthChanges(user);
  });
};

const updateUserProfile = (photoURL: string) => updateProfile(auth.currentUser!, {
  photoURL,
});

export const FirebaseAuthService = {
  registerUser,
  loginUser,
  logOutUser,
  sendPasswordResetEmail: (email: string) => {
    sendPasswordResetEmail(auth, email);
  },
  logInWithGoogle,
  subscribeToAuthChanges,
  updateUserProfile,
};
