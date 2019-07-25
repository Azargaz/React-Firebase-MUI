import app from 'firebase/app';

import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

class Firebase {
    constructor() {
        app.initializeApp(config)

        console.log(config.authDomain)

        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, pass) {
        return this.auth.signInWithEmailAndPassword(email, pass)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, pass) {
        await this.auth.createUserWithEmailAndPassword(email, pass)

        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    addFruit(fruit) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }

        return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
            fruit: fruit
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

    async getCurrentUserFruit() {
        const fruit = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()

        return fruit.get('fruit')
    }
}

export default new Firebase()