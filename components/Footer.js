import React from 'react';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

function Footer() {
    return (
        <footer>
            <div className={styles.footerPosition}>
                <p>&copy; Copyright Eithel Anderson 2021</p>

                <div className={styles.footerGithubText}>
                    <Image
                        className={styles.githubLogo}
                        src="/github_icon.svg"
                        alt="Github logo"
                        width={20}
                        height={15}
                    />
                    <a href="https://github.com/etelish">Github</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
