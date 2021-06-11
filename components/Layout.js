import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
    return (
        <div className={styles.content}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.element,
}.isRequired;
export default Layout;
