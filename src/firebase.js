import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "netflix-clone-b553a.firebaseapp.com",
    projectId: "netflix-clone-b553a",
    storageBucket: "netflix-clone-b553a.appspot.com",
    messagingSenderId: "781187229597",
    appId: "1:781187229597:web:2a8cf384596b28c35bf174"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()


export {auth}
export default db