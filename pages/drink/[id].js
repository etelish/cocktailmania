import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import FaveButton from '../../components/FaveButton';
import styles from '../../styles/Drink.module.css';

import useUser from '../../lib/use-user';

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
    const [drink, setDrink] = useState();
    const [source, setSource] = useState();
    const user = useUser();

    useEffect(() => {
        setDrink(sessionStorage.getItem('drink') || '');
        setSource(sessionStorage.getItem('source') || '');
    }, []);

    const {
        strMeasure1,
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

                {source === 'search' ? (
                    <button className={styles.buttonStyle} type="button">
                        <Link href={`/search?q=${drink}`}>
                            <a>Back to search results</a>
                        </Link>
                    </button>
                ) : (
                    <button className={styles.buttonStyle} type="button">
                        <Link href="/favouriteCocktails">
                            <a>Back to Fave Cocktails</a>
                        </Link>
                    </button>
                )}
            </div>
        </div>
    );
}

Drink.propTypes = {
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
export default Drink;
