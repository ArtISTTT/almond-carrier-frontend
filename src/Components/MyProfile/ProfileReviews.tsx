import { Pagination, Typography } from '@mui/material';
import styles from '../../../styles/ProfileReviews.module.css';
import React from 'react';
import dayjs from 'dayjs';
import ReviewItem from './ReviewItem';
import { useTranslation } from 'react-i18next';

const reviews = [
    {
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 1993,
        date: dayjs('2019-01-25'),
    },
    {
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 1993,
        date: dayjs('2019-01-25'),
    },
    {
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 11993,
        date: dayjs('2019-01-25'),
    },
    {
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 993,
        date: dayjs('2019-01-25'),
    },
];

const ProfileReviews = () => {
    const { t } = useTranslation();
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
                    <ReviewItem
                        key={i}
                        role={review.role}
                        text={review.text}
                        rating={review.rating}
                        benefit={review.benefit}
                        date={review.date}
                        avatar={review.avatar}
                        name={review.name}
                    />
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