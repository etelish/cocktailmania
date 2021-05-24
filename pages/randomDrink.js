import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from '../styles/Drink.module.css';
import 'firebase/auth';

import useUser from '../lib/use-user';

export async function getServerSideProps() {
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
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
        }
    }, [user, router]);

    const {
        strDrink,
        strDrinkCategory,
        strAlcoholic,
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
                            {strAlcoholic}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

RandomDrink.propTypes = {
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
export default RandomDrink;
