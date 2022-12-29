import { Avatar, Rating, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { IReview } from '../../interfaces/profile';
import styles from '../../../styles/ReviewItem.module.css';

const ReviewItem: React.FC<IReview> = ({
    role,
    text,
    rating,
    benefit,
    date,
    avatar,
    name,
}) => {
    return (
        <div className={styles.review}>
            <div className={styles.reviewProfile}>
                <Avatar
                    className={styles.reviewAvatar}
                    src={avatar}
                    alt={'Avatar'}
                />
                <Typography
                    className={styles.reviewName}
                    variant='h3'
                    component='h3'
                >
                    {name}
                </Typography>
                <Typography
                    className={styles.reviewRole}
                    variant='h4'
                    component='h4'
                >
                    {role}
                </Typography>
            </div>
            <div className={styles.reviewData}>
                <Typography
                    className={styles.reviewText}
                    variant='h5'
                    component='p'
                >
                    {text}
                </Typography>
                <div className={styles.reviewDetails}>
                    <Rating
                        className={styles.reviewRating}
                        defaultValue={rating}
                        precision={0.5}
                    />
                    <Typography
                        className={styles.reviewBenefit}
                        variant='h3'
                        component='p'
                    >
                        BENEFIT: <span>{benefit} RUB</span>
                    </Typography>
                    <Typography
                        className={styles.reviewDate}
                        variant='h3'
                        component='p'
                    >
                        {dayjs(date).format('DD.MM.YYYY')}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
