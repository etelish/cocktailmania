import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import styles from '../styles/Drink.module.css';
import 'firebase/auth';
import FaveButton from '../components/FaveButton';

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
    const ingredients = Array(15)
        .fill(null)
        .map((_, i) => i + 1)
        .reduce(
            (accumulator, number) =>
                results.drinks[0][`strMeasure${number}`]
                    ? [
                          ...accumulator,
                          results.drinks[0][`strMeasure${number}`] +
                              ' ' +
                              results.drinks[0][`strIngredient${number}`],
                      ]
                    : accumulator,
            [],
        );
    return (
        <div className={styles.drinkProfile}>
            <div className={styles.backgroundContainer}>
                <img
                    className={styles.drinkImage}
                    src={strDrinkThumb}
                    alt={strDrink}
                />
                <div className={styles.drinkText}>
                    <h1 className={styles.title}>{strDrink}</h1>
                    <p>{strAlcoholic}</p>
                    {ingredients.map((ingredient) => (
                        <p>{ingredient}</p>
                    ))}
                    <FaveButton cocktailId={idDrink} userId={user?.userId} />
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
