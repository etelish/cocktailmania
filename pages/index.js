import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import 'firebase/auth';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';
import { UserContext } from '../lib/user-context';
import styles from '../styles/Protected.module.css';

function Search({ results }) {
    const router = useRouter();
    const user = useContext(UserContext);

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
            console.log(`you've been redirected`);
        }
    }, [user, router]);

    function handleOnSubmitSearch(e) {
        e.preventDefault();

        const { currentTarget = {} } = e;
        const fields = Array.from(currentTarget?.elements);
        const fieldQuery = fields.find((field) => field.name === 'query');

        const value = fieldQuery.value || '';

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
                    <input name="query" type="search" />
                    <button type="submit">Search</button>
                </form>
            </main>
        </div>
    );
}

export default Search;
