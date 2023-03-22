import { Typography } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IUser } from 'src/interfaces/user';
import styles from '../../../styles/Profile.module.css';
import { selectUser } from '../../redux/selectors/user';
import UploadAvatar from './UploadAvatar';

const ProfileCard = () => {
    const user: IUser = useSelector(selectUser);
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
                {/* <Typography
                    className={styles.cardCity}
                    variant='h4'
                    component='h2'
                >
                    {t('from')}
                    <span>Moscow</span>
                </Typography> */}
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
                    <div className={styles.statisticValue}>
                        {user.rating ?? '-'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
