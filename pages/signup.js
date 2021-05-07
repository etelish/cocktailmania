import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { UserContext } from '../lib/user-context';

function PageSignUp() {
    const router = useRouter();
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);
    const user = useContext(UserContext);

    useEffect(() => {
        if (user?.loggedIn && user !== undefined) {
            router.push('/protected');
        }
    }, [user]);

    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            // Signed in
                            console.log(user);

                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
                            console.log(errorCode);
                            console.log(errorMessage);
                        });
                }}>
                <p>
                    <label htmlFor="email">
                        email
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
        </div>
    );
}

export default PageSignUp;