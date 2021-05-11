import React from 'react';
import styles from '../../styles/Results.module.css';

export async function getServerSideProps({ params }) {
    console.log(params);
    const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params.id}`,
    );
    const data = await res.json();
    return {
        props: {
            results: data,
        },
    };
}

function Drinks(results) {
    return (
        <div>
            {/* <ul className={styles.grid}>
                {results.drinks.map((drink) => {
                    const { idDrink, strDrink, strDrinkThumb } = drink;
                    return (
                        <li key={idDrink} className={styles.card}>
                            <a href="https://nextjs.org/docs">
                                <img
                                    className={styles.image}
                                    src={strDrinkThumb}
                                    alt={`${strDrink}`}
                                />
                                <h2>{strDrink}</h2>
                            </a>
                        </li>
                    );
                })}
            </ul> */}
        </div>
    );
}
export default Drinks;
