import { React, useContext, useEffect } from 'react';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/firestore';
import { useRouter } from 'next/router';

import { UserContext } from '../lib/user-context';

function FaveCocktails() {
    const router = useRouter();
    const user = useContext(UserContext);

    const db = firebase.firestore();
    const docRef = db.collection('Cocktails').doc(user?.userId);

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
        }
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log('Document data:', doc.data());
                } else {
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }, [user, router]);

    return (
        <div>
            <h1>hi</h1>
        </div>
    );
}

export default FaveCocktails;
