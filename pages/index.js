import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import 'firebase/auth';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { UserContext } from '../lib/user-context';
import styles from '../styles/Index.module.css';

function Search() {
    const router = useRouter();
    const user = useContext(UserContext);
    const [value, setValue] = useState();

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
        }
        sessionStorage.setItem('drink', value);
    }, [user, router, value]);

    function handleOnSubmitSearch(e) {
        e.preventDefault();

        router.push(`./search?q=${value}`);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Cocktailmania</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Cocktailmania</h1>

                <p className={styles.description}>For the cocktail lovers</p>

                <form className="search" onSubmit={handleOnSubmitSearch}>
                    <input
                        name="query"
                        type="search"
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                    />
                    <button type="submit">Search</button>
                </form>

                <Link href="/random-drink">
                    <a>Cocktail Roulette </a>
                </Link>
            </main>
        </div>
    );
}

export default Search;
