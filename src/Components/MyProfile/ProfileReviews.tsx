import { Pagination, Typography } from '@mui/material';
import styles from '../../../styles/ProfileReviews.module.css';
import React, { useEffect } from 'react';
import ReviewItem from './ReviewItem';
import { useTranslation } from 'react-i18next';
import { useLoadReviews } from 'src/redux/hooks/useLoadReviews';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/selectors/user';
import CircleLoader from '../Loaders/CircleLoader';
import { LoaderColors } from 'src/interfaces/loader';

const ProfileReviews = () => {
    const { t } = useTranslation();
    const { id } = useSelector(selectUser);
    const { reload, isLoading, error, reviews } = useLoadReviews(id);

    useEffect(() => {
        reload();
    }, []);

    if (isLoading) {
        return <CircleLoader color={LoaderColors.PRIMARY} />;
    }

    return (
        <div className={styles.reviewsWrapper}>
            <Typography
                className={styles.reviewsTitle}
                variant='h4'
                component='h3'
            >
                {t('reviews')}
            </Typography>
            <div className={styles.reviews}>
                {reviews.map((review, i) => (
                    <ReviewItem key={i} {...review} />
                ))}
            </div>
            <Pagination
                className={styles.pagination}
                count={Math.round(reviews.length / 5)}
                variant='outlined'
                color='primary'
            />
        </div>
    );
};

export default ProfileReviews;
