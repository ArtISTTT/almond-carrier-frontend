import React from 'react';
import styles from '../../styles/Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.dotElastic}></div>
        </div>
    );
};

export default Loader;
