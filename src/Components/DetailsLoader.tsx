import React from 'react';
import styles from '../../styles/OrderLoader.module.css';

const DetailsLoader = () => {
    return (
        <div className={styles.detailsLoaderWrapper}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default DetailsLoader;
