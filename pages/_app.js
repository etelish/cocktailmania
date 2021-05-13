import firebase from 'firebase/app';
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import '../styles/globals.css';
import styles from '../styles/Navbar.module.css';
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

function MyApp({ Component: Page, pageProps }) {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
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

    function NavBar() {
        return <div className={styles.navStyle} />;
    }

    return (
        <UserProvider value={user}>
            <NavBar />
            <Page {...pageProps} user={user} />
        </UserProvider>
    );
}

export default MyApp;
