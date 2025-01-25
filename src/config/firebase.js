import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

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

// Authentication functions
export const signUp = async (email, password, additionalInfo = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Add additional user info to Firestore
    await addDoc(collection(db, 'farmers'), {
      uid: user.uid,
      email: user.email,
      ...additionalInfo
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Product-related functions
export const addProduct = async (productData) => {
  try {
    return await addDoc(collection(db, 'products'), productData);
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getFarmerProducts = async (farmerId) => {
  try {
    const q = query(collection(db, 'products'), where('farmerId', '==', farmerId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error("Error fetching farmer products:", error);
    throw error;
  }
};

export { auth, db };