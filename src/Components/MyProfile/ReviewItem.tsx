import { Avatar, Rating, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IReview } from 'src/interfaces/api/review';
import styles from '../../../styles/ReviewItem.module.css';
import {motion} from 'framer-motion'

const ReviewItem: React.FC<IReview> = ({
    reviewerType,
    text,
    rating,
    payment,
    order,
    userReviewer,
}) => {
    //product name
    const { t } = useTranslation();

    return (
        <motion.div whileHover={{scale: 1.02}}>
            <div className={styles.review}>
                <div className={styles.reviewProfile}>
                    <Avatar
                        className={styles.reviewAvatar}
                        src={userReviewer.avatarImage}
                        alt={'Avatar'}
                    />
                    <div className={styles.reviewTextData}>
                        <Typography
                            className={styles.reviewName}
                            variant='h3'
                            component='h3'
                        >
                            {`${userReviewer.firstName} ${userReviewer.lastName}`}
                        </Typography>
                        <Typography
                            className={styles.reviewRole}
                            variant='h4'
                            component='h4'
                        >
                            {t(reviewerType)}
                        </Typography>
                    </div>
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
                            readOnly
                            precision={0.5}
                        />
                        <Typography
                            className={styles.reviewDate}
                            variant='h3'
                            component='p'
                        >
                            {dayjs(order.completedDate).format('DD.MM.YYYY')}
                        </Typography>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewItem;
