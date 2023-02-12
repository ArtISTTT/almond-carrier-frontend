import React from 'react';
import styles from '../../../styles/OrderLoader.module.css';

const UserLoader = () => {
    return (
        <div className={styles.userLoaderWrapper}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default UserLoader;
