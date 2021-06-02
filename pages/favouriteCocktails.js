import { React, useEffect, useState } from 'react';
import 'firebase/auth';
import Link from 'next/link';
import firebase from 'firebase';
import 'firebase/firestore';
import { useRouter } from 'next/router';
import styles from '../styles/Search.module.css';

import useUser from '../lib/use-user';

function FaveCocktails() {
    const router = useRouter();
    const user = useUser();
    const [faveDrink, setFaveDrink] = useState();
    const db = firebase.firestore();

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
        }
    }, [user, router]);
    useEffect(() => {
        if (user?.userId) {
            db.collection('Cocktails')
                .doc(user?.userId)
                .get()
                .then((ids) => {
                    if (ids.exists) {
                        return fetch('/api/faveDrink', {
                            method: 'POST',
                            body: JSON.stringify(ids.data().faveCocktails),
                        })
                            .then((response) => response.json())
                            .then((results) => {
                                setFaveDrink(results);
                            });
                    } else {
                        console.log(`doesn't exist`);
                    }
                });
        }
    }, [user, db]);

    console.log(faveDrink);

    if (!faveDrink) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    if (faveDrink.length < 1) {
        return (
            <div>
                <h1>Please add a adrink to you're fave list </h1>
            </div>
        );
    }

    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.title}>Cocktailmania</h1>

                <p className={styles.description}>For the cocktail lovers</p>

                <ul className={styles.grid}>
                    {faveDrink.drinks.length < 1 ? (
                        <h1>Please enter something else</h1>
                    ) : (
                        faveDrink.drinks.map((drink) => {
                            const { idDrink, strDrink, strDrinkThumb } = drink;
                            return (
                                <li key={idDrink} className={styles.card}>
                                    <img
                                        className={styles.image}
                                        src={strDrinkThumb}
                                        alt={`${strDrink}`}
                                    />
                                    <Link href={`./drink/${idDrink}`}>
                                        <a>
                                            <h2>{strDrink}</h2>
                                        </a>
                                    </Link>
                                </li>
                            );
                        })
                    )}
                </ul>
            </main>
        </div>
    );
}

export default FaveCocktails;
