import React from 'react';
import styles from '../../../styles/OrderLoader.module.css';

const MessagesLoader = () => {
    return (
        <div className={styles.messagesLoaderWrapper}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default MessagesLoader;
