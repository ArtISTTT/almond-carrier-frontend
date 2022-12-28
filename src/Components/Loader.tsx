import React from 'react';
import styles from '../../styles/Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.logoWrapper}>
                <div className={styles.loaderWrapper}>
                    <div className={styles.logo} />
                    <div className={styles.loader}>
                        <span />
                    </div>
                </div>
                <span>Friendly carrier</span>
            </div>
        </div>
    );
};

export default Loader;
