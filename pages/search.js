import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../styles/Search.module.css';

export async function getServerSideProps({ query }) {
    const response = await fetch(
        `${process.env.HOST}/api/searchDrink?s=${query.q}`,
    );

    const results = await response.json();
    return {
        props: {
            results,
        },
    };
}

function Results({ results }) {
    useEffect(() => {
        sessionStorage.setItem('source', 'search');
    }, []);
    return (
        <main className={styles.main}>
            <ul className={styles.grid}>
                {results.drinks.length < 1 ? (
                    <h1>Please enter something else</h1>
                ) : (
                    results.drinks.map((drink) => {
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
    );
}

Results.propTypes = {
    results: PropTypes.shape({
        drinks: PropTypes.arrayOf(
            PropTypes.shape({
                strDrink: PropTypes.string,
                strDrinkCategory: PropTypes.string,
                strAlcoholic: PropTypes.string,
                strGlass: PropTypes.string,
                strInstructions: PropTypes.string,
                strIngredient1: PropTypes.string,
                strDrinkThumb: PropTypes.string,
                idDrink: PropTypes.string,
            }),
        ),
    }).isRequired,
};

export default Results;
