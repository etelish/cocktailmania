import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import Link from 'next/link';

import useUser from '../lib/use-user';

function PageLogin() {
    const router = useRouter();
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);
    const user = useUser();

    useEffect(() => {
        if (user?.loggedIn && user !== undefined) {
            router.push('./');
        }
    }, [user, router]);

    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password)
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;

                            console.log(errorCode);
                            console.log(errorMessage);
                        });
                }}>
                <p>
                    <label htmlFor="email">
                        Email
                        <input
                            type="text"
                            name="size"
                            id="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        password
                        <input
                            type="password"
                            name="size"
                            id="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </label>
                </p>
                <input type="submit" value="Submit" />
            </form>
            <Link href="./signup">
                <a>click here to sign up</a>
            </Link>
        </div>
    );
}

export default PageLogin;
