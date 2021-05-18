import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Search.module.css';

export async function getServerSideProps({ query }) {
    const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query.q}`,
    );
    const data = await res.json();
    return {
        props: {
            results: data,
        },
    };
}

function Results({ results }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Cocktailmania</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Cocktailmania</h1>

                <p className={styles.description}>For the cocktail lovers</p>

                <ul className={styles.grid}>
                    {results.drinks.map((drink) => {
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
                    })}
                </ul>
            </main>
        </div>
    );
}
export default Results;
