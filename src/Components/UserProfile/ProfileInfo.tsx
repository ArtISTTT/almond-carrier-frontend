import { Button, Avatar, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../../../styles/ProfileForNewUser.module.css';
import { Container } from '@mui/system';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useRouter } from 'next/router';
import { navigateTo } from 'src/interfaces/navigate';

const ProfileInfo = () => {
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
                            className={styles.avatar}
                        />
                        <div className={styles.profileCardInfo}>
                            <Typography
                                className={styles.profileName}
                                variant='h3'
                                component='h3'
                            >
                                name surname
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('from')}: <span></span>
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('oftenFlies')}: <span></span>
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('currency')}:<span></span>
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
                        <CheckCircleIcon
                            sx={{ color: 'green', width: 18, height: 18 }}
                        />
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h5'
                        className={styles.confirmItem}
                    >
                        {t('phoneNumber')}{' '}
                        <CheckCircleIcon
                            sx={{ color: 'green', width: 18, height: 18 }}
                        />
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
                            16 {t('orders')}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='h6'
                            className={styles.secondInfoParam}
                        >
                            <span>{t('carrier')}</span>: 12 /{' '}
                            <span>{t('receiver')}</span>: 4
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
                            89%
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
                            4 {t('orders')}
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
                <div className={styles.profileButtonWrapper}>
                    <Button
                        onClick={navigateToSignUp}
                        className={styles.profileButton}
                        variant='contained'
                    >
                        {t('requestCarrierService')}
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default ProfileInfo;
