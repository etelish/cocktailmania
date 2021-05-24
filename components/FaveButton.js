import { React } from 'react';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';

function FaveButton({ userId, cocktailId }) {
    const db = firebase.firestore();

    const saveCocktail = () => {
        try {
            db.collection('Cocktails')
                .doc(userId)
                .set(
                    {
                        faveCocktails:
                            firebase.firestore.FieldValue.arrayUnion(
                                cocktailId,
                            ),
                    },
                    { merge: true },
                );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button type="submit" onClick={saveCocktail}>
            Add to fave list
        </button>
    );
}

FaveButton.propTypes = {
    userId: PropTypes.string,
    cocktailId: PropTypes.string,
}.isRequired;

export default FaveButton;
