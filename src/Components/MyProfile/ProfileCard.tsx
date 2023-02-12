import { Typography } from '@mui/material';
import styles from '../../../styles/Profile.module.css';
import React from 'react';
import classNames from 'classnames';
import UploadAvatar from './UploadAvatar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';
import { useTranslation } from 'react-i18next';

const ProfileCard = () => {
    const user = useSelector(selectUser);
    const { t } = useTranslation();

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
                    {t('from')} 
                    <span>Moscow</span> 
                </Typography>
                <div className={styles.statisticItem}>
                    <div className={styles.statisticTitle}>
                        {t('completedOrders')}
                    </div>
                    <div
                        className={classNames(
                            styles.statisticValue,
                            styles.green
                        )}
                    >
                        {user.completedOrders}
                    </div>
                </div>
                <div className={styles.statisticItem}>
                    <div className={styles.statisticTitle}>{t('rating')}</div>
                    <div className={styles.statisticValue}>0</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
