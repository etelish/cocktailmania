import React from 'react';
import 'firebase/auth';
import firebase from 'firebase';
import Image from 'next/image';

import Link from 'next/link';
import useUser from '../lib/use-user';

import styles from '../styles/Navbar.module.css';

function Navbar() {
    const user = useUser();

    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <a className={styles.logo}>Cocktailmania</a>
            </Link>
            {/* <img
                className={styles.cocktail_logo}
                src="cocktailmania_logo.png"
                alt="cocktailmania logo"
            /> */}
            {user?.loggedIn && (
                <ul className={styles.links}>
                    <li>
                        <Link href="/">
                            <a>Cocktail Search</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/favouriteCocktails">
                            <a>Fave Cocktails</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/randomDrink">
                            <a>Cocktail Roulette</a>
                        </Link>
                    </li>

                    <li>
                        <button
                            className={styles.logout}
                            type="button"
                            onClick={() => {
                                firebase
                                    .auth()
                                    .signOut()
                                    .then(() => {
                                        // Sign-out successful.
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}>
                            <Link href="/">
                                <a>Logout</a>
                            </Link>
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
