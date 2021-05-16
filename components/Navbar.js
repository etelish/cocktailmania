import { React, useContext } from 'react';
import 'firebase/auth';
import Link from 'next/link';
import { UserContext } from '../lib/user-context';

import styles from '../styles/Navbar.module.css';

function Navbar() {
    const user = useContext(UserContext);

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
                            <Link href="/index">
                                <a>logout</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
