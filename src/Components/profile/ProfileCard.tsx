import { Avatar, Rating, Typography } from '@mui/material';
import styles from '../../../styles/Profile.module.css';
import React from 'react';

const ProfileCard = () => {
    const [value, setValue] = React.useState<number | null>(4.5);

    return (
        <div className={styles.card}>
            <Avatar
                src='#'
                alt='Profile Avatar'
                className={styles.avatar}
                sx={{ width: 180, height: 180 }}
            />
            <div className={styles.cardInfo}>
                <Typography
                    className={styles.cardName}
                    variant='h4'
                    component='h2'
                >
                    Samanta Goodman
                </Typography>
                <Typography
                    className={styles.cardRole}
                    variant='h4'
                    component='h2'
                >
                    Carrier
                </Typography>
                <Typography
                    className={styles.cardOrders}
                    variant='h4'
                    component='h2'
                >
                    Completed orders: <span>20</span>
                </Typography>
                <Typography
                    className={styles.cardCity}
                    variant='h4'
                    component='h2'
                >
                    From: <span>Moscow</span>
                </Typography>
                <Rating
                    precision={0.5}
                    className={styles.cardRating}
                    name='read-only'
                    value={value}
                    readOnly
                />
            </div>
        </div>
    );
};

export default ProfileCard;
