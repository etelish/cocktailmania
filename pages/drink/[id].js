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
    const [value, setValue] = useState();
    const user = useUser();

    useEffect(() => {
        setValue(sessionStorage.getItem('drink') || '');
    }, []);

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
                        <FaveButton
                            cocktailId={idDrink}
                            userId={user?.userId}
                        />
                    </ul>
                    <Link href={`/search?q=${value}`}>
                        <a>Back to results</a>
                    </Link>
                </div>
            </div>
            <p></p>
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
