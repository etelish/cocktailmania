import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

export const defaultUser = { loggedIn: false, email: '' };

function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            callback({ loggedIn: true, userId: user.uid });
        } else {
            callback({ loggedIn: false });
        }
    });
}

export default function useUser() {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);
    return user;
}
