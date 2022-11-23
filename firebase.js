// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4oOGyojfqpLPTtHnnHvYAWbQ1i5IZ3_s",
  authDomain: "fir-javascript-crud-1631c.firebaseapp.com",
  projectId: "fir-javascript-crud-1631c",
  storageBucket: "fir-javascript-crud-1631c.appspot.com",
  messagingSenderId: "648387754924",
  appId: "1:648387754924:web:ed5e0b13e7e8e804041809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => 
  addDoc(collection(db, 'tasks'), {title, description });


  export const getTasks = () => getDocs(collection(db, 'tasks'))
