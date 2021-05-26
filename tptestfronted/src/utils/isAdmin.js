import firebaseApp from "./Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export async function isAdmin(uid) {
    if (uid) {
        const response = await db.collection("admins").doc(uid).get()
        return response.exists;
    }
}