import { Button, Avatar, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../../../styles/ProfileForNewUser.module.css';
import { Container } from '@mui/system';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useRouter } from 'next/router';
import { navigateTo } from 'src/interfaces/navigate';
import { IGetUser } from 'src/interfaces/api/user';
import dayjs from 'dayjs';

interface IProps {
    user: IGetUser;
}

const ProfileInfo: React.FC<IProps> = ({ user }) => {
    const router = useRouter();

    const navigateToSignUp = () => router.push(navigateTo.SIGNUP);

    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <Container className={styles.profileInfoContainer} maxWidth={false}>
                <div className={styles.profileBlock}>
                    <div className={styles.profileCard}>
                        <Avatar
                            src='/static/images/signin-image.png'
                            sx={{ width: 140, height: 140 }}
                        />
                        <div className={styles.profileCardInfo}>
                            <Typography
                                className={styles.profileName}
                                variant='h3'
                                component='h3'
                            >
                                {user?.firstName} {user?.lastName}
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('from')}: <span>{user?.fromLocation}</span>
                            </Typography>

                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('gender')}:{' '}
                                <span>
                                    {user.gender && (t(user?.gender) as string)}
                                </span>
                            </Typography>

                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('dateOfBirth')}:{' '}
                                <span>
                                    {dayjs(user.dateOfBirth).format(
                                        'DD.MM.YYYY'
                                    )}
                                </span>
                            </Typography>
                        </div>
                    </div>
                    <Rating
                        className={styles.profileRating}
                        name='half-rating'
                        defaultValue={4.5}
                        readOnly
                        precision={0.5}
                    />
                </div>
                <div className={styles.confirmBlock}>
                    <Typography
                        variant='h6'
                        component='h5'
                        className={styles.confirmItem}
                    >
                        {t('email')}{' '}
                        {user.verifiedByEmail ? (
                            <CheckCircleIcon
                                sx={{ color: 'green', width: 18, height: 18 }}
                            />
                        ) : (
                            <CancelIcon
                                sx={{ color: 'red', width: 18, height: 18 }}
                            />
                        )}
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h5'
                        className={styles.confirmItem}
                    >
                        {t('phoneNumber')}{' '}
                        {user.verifiedByPhone ? (
                            <CheckCircleIcon
                                sx={{ color: 'green', width: 18, height: 18 }}
                            />
                        ) : (
                            <CancelIcon
                                sx={{ color: 'red', width: 18, height: 18 }}
                            />
                        )}
                    </Typography>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            {t('allOrders')}
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            {user?.completedOrders} {t('orders')}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='h6'
                            className={styles.secondInfoParam}
                        >
                            <span>{t('carrier')}</span>:{' '}
                            {user?.completedOrdersAsCarrier} /{' '}
                            <span>{t('receiver')}</span>:{' '}
                            {user?.completedOrdersAsReceiver}
                        </Typography>
                    </div>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            {t('completionRate')}
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            {user?.completionRate}%
                        </Typography>
                    </div>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            {t('activityInLastDays')}
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            <>
                                {user?.ordersInLastMonth} {t('orders')}
                            </>
                        </Typography>
                    </div>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            {t('averageCompletionTime')}
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            18 {t('days')}
                        </Typography>
                    </div>
                </div>
                <Button
                    onClick={navigateToSignUp}
                    className={styles.profileButton}
                    variant='contained'
                >
                    {t('requestCarrierService')}
                </Button>
            </Container>
        </div>
    );
};

export default ProfileInfo;
