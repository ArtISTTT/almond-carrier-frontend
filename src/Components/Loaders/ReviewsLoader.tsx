import React from 'react';
import styles from '../../../styles/OrderLoader.module.css';

const ReviewsLoader = () => {
    return (
        <div className={styles.reviewsLoaderWrapper}>
            <div className={styles.ldsRingReview}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default ReviewsLoader;
