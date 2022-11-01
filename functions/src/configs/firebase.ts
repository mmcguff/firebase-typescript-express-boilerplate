import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const firebaseAdmin = admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();
export const userCollection = "users";
