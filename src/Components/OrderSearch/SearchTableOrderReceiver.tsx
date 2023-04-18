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
import FastLoginPopup from './FastLoginPopup';

type IProps = {
    isRedirectPopupOpen: boolean;
    setIsRedirectPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isFastLoginPopupOpen: boolean;
    setIsFastLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    order: IOrder;
    setApplyedOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
};

const SearchTableOrderReceiver: React.FC<IProps> = ({
    isFastLoginPopupOpen,
    isRedirectPopupOpen,
    setIsRedirectPopupOpen,
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

    const openPopupFunc = () => {
        if (isAuthorized && isUserVerified) {
            setApplyedOrder(order);
        } else if (isAuthorized && !isUserVerified) {
            setIsRedirectPopupOpen(true);
        } else {
            setIsFastLoginPopupOpen(true);
        }
    };

    const navigateToUserPage = (): void => {
        router.push({
            pathname: navigateTo.USER,
            query: { userId: order.receiver?.id },
        });
    };

    const navigateToLogin = () => router.push(navigateTo.SIGNIN);
    const navigateToVerification = () =>
        router.push(navigateTo.PROFILE_VERIFICATION);

    return (
        <>
            {isRedirectPopupOpen && (
                <FastLoginPopup
                    completeFunction={navigateToVerification}
                    textButton={'verify'}
                    setIsFastLoginPopupOpen={setIsRedirectPopupOpen}
                />
            )}
            {isFastLoginPopupOpen && (
                <FastLoginPopup
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
                            src={order.receiver?.avatar}
                            className={styles.avatar}
                        />
                        <div className={styles.userInfo}>
                            <div
                                onClick={navigateToUserPage}
                                className={styles.userName}
                            >
                                {order.receiver?.firstName}{' '}
                                {order.receiver?.lastName}
                            </div>
                            <div
                                className={cn(
                                    styles.infoItem,
                                    styles.infoItemRating
                                )}
                            >
                                {t('rating')}:{' '}
                                <span>
                                    {order.receiver?.rating
                                        ? order.receiver?.rating
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
                                        {order.fromLocation ?? t('undefined')}
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
                    <div className={cn(styles.part, styles.productName)}>
                        {order.productName}
                    </div>
                    <div className={cn(styles.part, styles.doubleditem)}>
                        <div>
                            <div className={styles.benefitPriceItem}>
                                <span className={styles.prefix}>
                                    {t('price')}:
                                </span>
                                <span className={styles.benefitPriceValue}>
                                    {order.productAmount !== undefined &&
                                        formatAmount(
                                            order.productAmount,
                                            Currency.RUB,
                                            true
                                        )}
                                </span>
                            </div>

                            <div className={styles.benefitPriceItem}>
                                <span className={styles.prefix}>
                                    {t('benefit')}:
                                </span>
                                <span className={styles.benefitPriceValue}>
                                    {formatAmount(
                                        order.rewardAmount,
                                        Currency.RUB,
                                        true
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cn(styles.part, styles.maxWeight)}>
                        {order.productWeight} {t('kg')}
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

export default SearchTableOrderReceiver;
