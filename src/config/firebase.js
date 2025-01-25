import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRN4UzTnymRl5gDG7qnXcb8_ING7G2Cgk",
  authDomain: "farmer-5d2ca.firebaseapp.com",
  projectId: "farmer-5d2ca",
  storageBucket: "farmer-5d2ca.firebasestorage.app",
  messagingSenderId: "474369328829",
  appId: "1:474369328829:web:37929beef1f7aad791d9d4",
  measurementId: "G-Q64L0RTYQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistent authentication
setPersistence(auth, browserLocalPersistence);

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const email = 'admin@admin.com';
    const password = 'admin123';

    // Try to sign in first
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // If user doesn't exist, create it
    if (error.code === 'auth/user-not-found') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create admin user document in Firestore
        await setDoc(doc(db, 'farmers', user.uid), {
          uid: user.uid,
          email: email,
          role: 'admin',
          name: 'Admin Farmer'
        });

        console.log('Default admin user created');
      } catch (createError) {
        console.error('Error creating default admin:', createError);
      }
    } else {
      console.error('Login error:', error);
    }
  }
};

// Authentication functions
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email, password, additionalInfo = {}) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  await setDoc(doc(db, 'farmers', user.uid), {
    uid: user.uid,
    email: user.email,
    ...additionalInfo
  });

  return user;
};

// Product-related functions
export const addProduct = async (productData) => {
  return await addDoc(collection(db, 'products'), productData);
};

export const getProducts = async () => {
  const productsCollection = collection(db, 'products');
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

// Initialize default admin on module load
createDefaultAdmin();

export { auth, db };