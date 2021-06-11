import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import Link from 'next/link';
import useUser from '../lib/use-user';
import styles from '../styles/Login.module.css';

function PageSignUp() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const user = useUser();

    useEffect(() => {
        if (user?.loggedIn && user !== undefined) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <div className={styles.container}>
            <form
                className={styles.loginForm}
                onSubmit={(event) => {
                    event.preventDefault();
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {})
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
                            console.log(errorCode);
                            console.log(errorMessage);
                        });
                }}>
                <h1 className={styles.signUpTitle}>Sign up to get started</h1>
                <label htmlFor="email">
                    <input
                        className={styles.emailField}
                        type="text"
                        name="size"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </label>
                <label htmlFor="password">
                    <input
                        className={styles.passwordField}
                        type="password"
                        name="size"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </label>
                <input
                    className={styles.buttonStyle}
                    type="submit"
                    value="Sign Up"
                />
                Already registered?
                <Link href="./login">
                    <a className={styles.signUpLink}>Click here to login</a>
                </Link>
            </form>
        </div>
    );
}

export default PageSignUp;
