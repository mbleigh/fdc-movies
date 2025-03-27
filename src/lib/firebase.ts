import { initializeApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import {
	getAuth,
	GoogleAuthProvider,
	initializeAuth,
	signInWithPopup,
	signOut as firebaseSignOut,
	onAuthStateChanged,
} from "firebase/auth";
import { updateUser } from "@app/data";

export const app = initializeApp({
	apiKey: "AIzaSyADWkjEEgwRDnZYX0YNB7Gc8TyJG8A3muY",
	authDomain: "next25-movies.firebaseapp.com",
	projectId: "next25-movies",
	storageBucket: "next25-movies.firebasestorage.app",
	messagingSenderId: "527664537880",
	appId: "1:527664537880:web:016ba1a8987f56650cbe6d",
});

export const dc = getDataConnect(app, {
	connector: "connector",
	location: "us-central1",
	service: "app",
});

export const auth = getAuth(app);
export const signIn = () => {
	signInWithPopup(auth, new GoogleAuthProvider());
};
export const signOut = () => {
	firebaseSignOut(auth);
};
onAuthStateChanged(auth, async (user) => {
	if (user && !localStorage.getItem("savedUser")) {
		await updateUser(dc, {
			username: user.email?.split("@")[0]!,
			displayName: user.displayName,
			imageUrl: user.photoURL,
		});
		localStorage.setItem("savedUser", "true");
	}
});
