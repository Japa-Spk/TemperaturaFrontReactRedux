// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDu5cnb_uh6U-5ecfpSOUm06OWK7iDgElI",
    authDomain: "temperatura-spk.firebaseapp.com",
    projectId: "temperatura-spk",
    storageBucket: "temperatura-spk.appspot.com",
    messagingSenderId: "992049910728",
    appId: "1:992049910728:web:6e18c5d1d8c03e64cba6fd",
    measurementId: "G-RFHRKFV40W"
};

// Initialize Firebase
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    addQuote(quote) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }

        return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
            quote
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    async getCurrentUserQuote() {
        const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
        return quote.get('quote')
    }
}

export default new Firebase()