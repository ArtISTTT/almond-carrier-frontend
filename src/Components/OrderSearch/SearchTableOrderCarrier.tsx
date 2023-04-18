import { Avatar, Button, Tooltip } from '@mui/material';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { navigateTo } from 'src/interfaces/navigate';
import { Currency } from 'src/interfaces/settings';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { selectIsAuthorized } from 'src/redux/selectors/user';
import styles from '../../../styles/OrderSearch.module.css';
import { IOrder } from '../../interfaces/order';
import RedirectPopup from './RedirectPopup';

type IProps = {
    isRedirectPopupOpen: boolean;
    setIsRedirectPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isFastLoginPopupOpen: boolean;
    setIsFastLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    order: IOrder;
    setApplyedOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
};

const SearchTableOrderCarrier: React.FC<IProps> = ({
    isRedirectPopupOpen,
    setIsRedirectPopupOpen,
    isFastLoginPopupOpen,
    setIsFastLoginPopupOpen,
    order,
    setApplyedOrder,
}) => {
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const isAuthorized = useSelector(selectIsAuthorized);
    const router = useRouter();
    const isUserVerified = useAppSelector(
        state => state.user.data?.idVerificationCompleted
    );

    const navigateToUserPage = (): void => {
        router.push({
            pathname: navigateTo.USER,
            query: { userId: order.carrier?.id },
        });
    };
    const navigateToLogin = () => router.push(navigateTo.SIGNIN);
    const navigateToVerification = () =>
        router.push(navigateTo.PROFILE_VERIFICATION);

    const openPopupFunc = () => {
        if (isAuthorized && isUserVerified) {
            setApplyedOrder(order);
        } else if (isAuthorized && !isUserVerified) {
            setIsRedirectPopupOpen(true);
        } else {
            setIsFastLoginPopupOpen(true);
        }
    };

    return (
        <>
            {isRedirectPopupOpen && (
                <RedirectPopup
                    completeFunction={navigateToVerification}
                    textButton={'verify'}
                    setIsFastLoginPopupOpen={setIsRedirectPopupOpen}
                />
            )}
            {isFastLoginPopupOpen && (
                <RedirectPopup
                    completeFunction={navigateToLogin}
                    textButton={'signIn'}
                    setIsFastLoginPopupOpen={setIsFastLoginPopupOpen}
                />
            )}
            <div>
                <div className={styles.itemWrapper}>
                    <div className={cn(styles.part, styles.user)}>
                        <Avatar
                            sx={{ width: 60, height: 60, cursor: 'pointer' }}
                            alt='logo'
                            src={order.carrier?.avatar}
                            className={styles.avatar}
                        />
                        <div className={styles.userInfo}>
                            <div
                                onClick={navigateToUserPage}
                                className={styles.userName}
                            >
                                {order.carrier?.firstName}{' '}
                                {order.carrier?.lastName}
                            </div>
                            <div
                                className={cn(
                                    styles.infoItem,
                                    styles.infoItemRating
                                )}
                            >
                                {t('rating')}:{' '}
                                <span>
                                    {order.carrier?.rating
                                        ? order.carrier?.rating
                                        : '-'}
                                </span>
                            </div>
                            {/* <div
                                className={cn(
                                    styles.infoItem,
                                    styles.infoItemCompleted
                                )}
                            >
                                {t('completedOrders')}: <span>16666</span>
                            </div> */}
                        </div>
                    </div>
                    <div
                        className={cn(
                            styles.part,
                            styles.fromTo,
                            styles.doubleditem
                        )}
                    >
                        <div>
                            <Tooltip
                                title={order.fromLocation}
                                placement='bottom'
                            >
                                <div className={styles.fromToItem}>
                                    <span className={styles.prefix}>
                                        {t('from')}:
                                    </span>
                                    <span
                                        className={
                                            styles.toAndFromLocationValue
                                        }
                                    >
                                        {order.fromLocation}
                                    </span>
                                </div>
                            </Tooltip>
                            <Tooltip
                                title={order.toLocation}
                                placement='bottom'
                            >
                                <div className={styles.fromToItem}>
                                    <span className={styles.prefix}>
                                        {t('to')}:
                                    </span>
                                    <span
                                        className={
                                            styles.toAndFromLocationValue
                                        }
                                    >
                                        {order.toLocation}
                                    </span>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={cn(styles.part, styles.flightDate)}>
                        {order.arrivalDate?.format('DD.MM.YYYY')}
                    </div>
                    <div className={cn(styles.part, styles.benefit)}>
                        {formatAmount(order.rewardAmount, Currency.RUB, true)}
                    </div>
                    <div className={cn(styles.part, styles.maxWeight)}>
                        {order.carrierMaxWeight} {t('kg')}
                    </div>
                    <div className={cn(styles.part, styles.button)}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={openPopupFunc}
                                variant='contained'
                                className={styles.applyBtn}
                            >
                                {t('apply')}
                            </Button>
                        </motion.div>
                    </div>
                </div>
                <div className={styles.hidingButton}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={openPopupFunc}
                            variant='contained'
                            className={styles.applyBtn}
                        >
                            {t('apply')}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default SearchTableOrderCarrier;
