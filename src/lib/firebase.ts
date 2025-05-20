/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
