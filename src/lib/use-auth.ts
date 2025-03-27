import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export function useAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setIsLoading(false);
		});
	}, []);

	return { user: currentUser, isLoading };
}
