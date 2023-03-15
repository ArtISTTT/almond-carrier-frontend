import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, Button, Rating, Typography } from '@mui/material';
import { Container } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IGetUser } from 'src/interfaces/api/user';
import { Genders } from 'src/interfaces/settings';
import usePlural from 'src/redux/hooks/usePlural';
import styles from '../../../styles/ProfileForNewUser.module.css';

interface IProps {
    user: IGetUser;
}

const genders = {
    [Genders.MALE]: 'male',
    [Genders.FEMALE]: 'female',
    [Genders.OTHER]: 'other',
    [Genders.NONE]: 'none',
};

const ProfileInfo: React.FC<IProps> = ({ user }) => {
    const { t } = useTranslation();
    const plural = usePlural();

    return (
        <div className={styles.wrapper}>
            <Container className={styles.profileInfoContainer} maxWidth={false}>
                <div className={styles.profileBlock}>
                    <div className={styles.profileCard}>
                        <Avatar
                            src={user.avatar}
                            sx={{ width: 140, height: 140 }}
                            className={styles.avatar}
                        />
                        <div className={styles.profileCardInfo}>
                            <Typography
                                className={styles.profileName}
                                variant='h3'
                                component='h3'
                            >
                                {user?.firstName} {user?.lastName}
                            </Typography>
                            {/* <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                {t('from')}: <span>{user?.fromLocation}</span>
                            </Typography> */}

                            {user.gender && (
                                <Typography
                                    className={styles.profileCardItem}
                                    variant='h6'
                                    component='h5'
                                >
                                    {t('gender')}:{' '}
                                    <span>{t(genders[user.gender])}</span>
                                </Typography>
                            )}

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
                        defaultValue={user.rating ?? 0}
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
                        {user.verifiedByEmail ? (
                            <>
                                {t('emailConfirmed')}{' '}
                                <CheckCircleIcon
                                    sx={{
                                        color: 'green',
                                        width: 18,
                                        height: 18,
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                {t('emailNotConfirmed')}{' '}
                                <CancelIcon
                                    sx={{ color: 'red', width: 18, height: 18 }}
                                />
                            </>
                        )}
                    </Typography>
                    {/* <Typography
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
                    </Typography> */}
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
                            {plural(user?.completedOrders, [
                                t('oneOrder'),
                                t('twoFourOrders'),
                                t('elevenOrders'),
                            ])}
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
                    {/* <div className={styles.infoItem}>
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
                    </div> */}
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
                                {plural(user?.ordersInLastMonth, [
                                    t('oneOrder'),
                                    t('twoFourOrders'),
                                    t('elevenOrders'),
                                ])}
                            </>
                        </Typography>
                    </div>
                    {/* <div className={styles.infoItem}>
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
                    </div> */}
                </div>
                {/* <div className={styles.profileButtonWrapper}>
                    <Button
                        onClick={navigateToSignUp}
                        className={styles.profileButton}
                        variant='contained'
                    >
                        {t('requestCarrierService')}
                    </Button>
                </div> */}
            </Container>
        </div>
    );
};

export default ProfileInfo;
