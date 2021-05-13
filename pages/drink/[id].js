import { React, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Drink.module.css';

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`,
    );

    const data = await res.json();
    return {
        props: {
            results: data,
        },
    };
}

function Drink({ results }) {
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(sessionStorage.getItem('drink') || '');
    }, []);

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
                <Link href={`/search?q=${value}`}>
                    <a>Back to results</a>
                </Link>
            </p>
        </div>
    );
}
export default Drink;
