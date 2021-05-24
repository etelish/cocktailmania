import React from 'react';
import 'firebase/auth';
import firebase from 'firebase';

import Link from 'next/link';
import useUser from '../lib/use-user';

import styles from '../styles/Navbar.module.css';

function Navbar() {
    const user = useUser();

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSide}>
                <div className={styles.navbarLogo}>
                    <h1>Cocktailmania</h1>
                </div>
            </div>
            {user?.loggedIn && (
                <div className={styles.rightSide}>
                    <ul className={styles.links}>
                        <li>
                            <Link href="/">
                                <a>Cocktail search</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/favouriteCocktails">
                                <a>Fave Cocktails</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/randomDrink">
                                <a>Cocktail roulette</a>
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
                                    <a>logout</a>
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
