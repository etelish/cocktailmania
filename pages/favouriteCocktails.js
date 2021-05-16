import { React, useContext, useEffect } from 'react';
import 'firebase/auth';
import { useRouter } from 'next/router';

import { UserContext } from '../lib/user-context';

function FaveCocktails() {
    const router = useRouter();
    const user = useContext(UserContext);

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
        }
    }, [user, router]);

    return (
        <div>
            <h1>fave cocktail</h1>
        </div>
    );
}

export default FaveCocktails;
