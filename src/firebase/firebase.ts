// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `AIzaSyBAuRw-iPOpSpHknha3rwbtcCicu6813wQ`,
  authDomain: 'img-upload-7d368.firebaseapp.com',
  projectId: 'img-upload-7d368',
  storageBucket: 'img-upload-7d368.appspot.com',
  messagingSenderId: '218564892598',
  appId: '1:218564892598:web:e5e7d273c29f26970c1317',
  measurementId: 'G-HZ9EDNQL6V',
}

// Initialize Firebasee
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
const analytics = getAnalytics(app)
export default app
