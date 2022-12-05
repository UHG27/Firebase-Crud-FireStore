// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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

const storage = getStorage(app);

export const saveTask = (title, description, imageName, imageUrl) => addDoc(collection(db, 'tasks'), { title, description, imageName, imageUrl});

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  const storageRef = ref(storage, `Images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '%done');
      //document.querySelector('#progress').innterText = 'Upload is ' + progress + '% done';
      document.querySelector('#progress').value = progress;
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector('#progress').value = 'FIN!!!!!';   
        document.querySelector('#image').src = downloadURL; 
        //console.log('File available at', downloadURL);
      });
    }
  );
}