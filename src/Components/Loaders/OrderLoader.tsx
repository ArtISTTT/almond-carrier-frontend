import React from 'react';
import styles from '../../../styles/OrderLoader.module.css';

const OrderLoader = () => {
    return (
        <div className={styles.orderLoaderWrapper}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default OrderLoader;
