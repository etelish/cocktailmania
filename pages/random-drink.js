import React from 'react';
import Link from 'next/link';
import styles from '../styles/Drink.module.css';

export async function getServerSideProps() {
    // console.log(params);
    const res = await fetch(
        ' https://www.thecocktaildb.com/api/json/v1/1/random.php',
    );

    const data = await res.json();
    return {
        props: {
            results: data,
        },
    };
}

function RandomDrink({ results }) {
    // console.log(results);
    const {
        strDrink,
        strDrinkCategory,
        strAlcohiolic,
        strGlass,
        strInstructions,
        strIngredient1,
        strDrinkThumb,
        idDrink,
    } = results.drinks[0];
    return (
        <div className={styles.container}>
            <main className={styles.main} />
            <h1 className={styles.title}>{strDrink}</h1>
            <div className={styles.drinkProfile}>
                <div className={styles.drinkImage}>
                    <img src={strDrinkThumb} alt={strDrink} />
                </div>
                <div className={styles.drinkDetails}>
                    <h2>Cocktail Information</h2>
                    <ul>
                        <li>
                            <strong>Cocktail:</strong>
                            {strDrink}
                        </li>
                        <li>
                            <strong>Alcoholic:</strong>
                            {strAlcohiolic}
                        </li>
                    </ul>
                </div>
            </div>
            <p>
                <Link href="/">
                    <a>Search cocktail</a>
                </Link>
            </p>
        </div>
    );
}
export default RandomDrink;
