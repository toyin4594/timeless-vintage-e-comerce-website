import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { auth } from '../config/firebase.config';

// Custom hook for auth state
export function useAuth() {
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || ''
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
}

// Auth methods with improved error handling
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    console.error('Login error:', error);
    
    // More user-friendly error messages
    switch (error.code) {
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled');
      case 'auth/user-not-found':
        throw new Error('No account found with this email');
      case 'auth/wrong-password':
        throw new Error('Incorrect password');
      case 'auth/invalid-api-key':
      case 'auth/api-key-not-valid':
        throw new Error('Authentication service is temporarily unavailable');
      default:
        throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    console.error('Registration error:', error);
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('An account already exists with this email');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address');
      case 'auth/operation-not-allowed':
        throw new Error('Email/password accounts are not enabled');
      case 'auth/weak-password':
        throw new Error('Password should be at least 6 characters');
      default:
        throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to log out. Please try again.');
  }
}