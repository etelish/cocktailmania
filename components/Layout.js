import React from 'react';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
    return (
        <div className={styles.content}>
            <Navbar />
            {children}
        </div>
    );
}
export default Layout;
