import firebase from 'firebase/app';
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import '../styles/globals.css';
import { UserProvider } from '../lib/user-context';

require('dotenv').config();

function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            callback({ loggedIn: true });
            console.log('logged in');
        } else {
            callback({ loggedIn: false });
            console.log('logged out');
        }
    });
}

function MyApp({ Component, pageProps }) {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    };
    console.log(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

    // if (!user.loggedIn) {
    //     return <Login />;
    // }

    return (
        <UserProvider value={user}>
            <Component {...pageProps} user={user} />
        </UserProvider>
    );
}

export default MyApp;
