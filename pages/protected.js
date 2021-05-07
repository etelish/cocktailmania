import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/user-context';

function PageProtected() {
    const router = useRouter();
    const user = useContext(UserContext);
    console.log(user);

    useEffect(() => {
        if (!user?.loggedIn && user !== undefined) {
            router.push('/login');
            console.log(`you've been redirected`);
        }
    }, [user, router]);

    return (
        <div>
            Protected
            <Link href="/login">
                <a>Login Page</a>
            </Link>
        </div>
    );
}
export default PageProtected;
