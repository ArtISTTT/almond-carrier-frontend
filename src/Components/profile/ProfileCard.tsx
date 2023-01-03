import { Typography } from '@mui/material';
import styles from '../../../styles/Profile.module.css';
import React from 'react';
import classNames from 'classnames';
import UploadAvatar from './UploadAvatar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';

const ProfileCard = () => {
    const user = useSelector(selectUser);

    return (
        <div className={styles.card}>
            <UploadAvatar />
            <div className={styles.cardInfo}>
                <Typography
                    className={styles.cardName}
                    variant='h4'
                    component='h2'
                >
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography
                    className={styles.cardCity}
                    variant='h4'
                    component='h2'
                >
                    From Moscow
                </Typography>
                <div className={styles.statisticItem}>
                    <div className={styles.statisticTitle}>
                        Completed orders
                    </div>
                    <div
                        className={classNames(
                            styles.statisticValue,
                            styles.green
                        )}
                    >
                        12
                    </div>
                </div>
                <div className={styles.statisticItem}>
                    <div className={styles.statisticTitle}>Rating</div>
                    <div className={styles.statisticValue}>4.75</div>
                </div>
                {/* <Rating
                    precision={0.5}
                    className={styles.cardRating}
                    name='read-only'
                    value={value}
                    readOnly
                /> */}
            </div>
        </div>
    );
};

export default ProfileCard;
