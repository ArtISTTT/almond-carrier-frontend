import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button, Tooltip } from '@mui/material';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import { useTranslation } from 'next-i18next';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { Currency } from 'src/interfaces/settings';
import { useRouter } from 'next/router';
import { navigateTo } from 'src/interfaces/navigate';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from 'src/redux/selectors/user';
import FastLoginPopup from './FastLoginPopup';

type IProps = {
    isFastLoginPopupOpen: boolean;
    setIsFastLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    order: IOrder;
    setApplyedOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
};

const SearchTableOrderCarrier: React.FC<IProps> = ({
    isFastLoginPopupOpen,
    setIsFastLoginPopupOpen,
    order,
    setApplyedOrder,
}) => {
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const isAuthorized = useSelector(selectIsAuthorized);
    const router = useRouter();

    const openPopupFunc = () => {
        if (isAuthorized) {
            setApplyedOrder(order);
        } else {
            setIsFastLoginPopupOpen(true);
        }
    };

    const navigateToUserPage = (): void => {
        router.push({
            pathname: navigateTo.USER,
            query: { userId: order.carrier?.id },
        });
    };

    return (
        <>
            {isFastLoginPopupOpen && (
                <FastLoginPopup
                    setIsFastLoginPopupOpen={setIsFastLoginPopupOpen}
                />
            )}
            <div>
                <div className={styles.itemWrapper}>
                    <div className={cn(styles.part, styles.user)}>
                        <Avatar
                            sx={{ width: 60, height: 60, cursor: 'pointer' }}
                            alt='logo'
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
                                        : 0}
                                </span>
                            </div>
                            <div
                                className={cn(
                                    styles.infoItem,
                                    styles.infoItemCompleted
                                )}
                            >
                                {t('completedOrders')}: <span>16</span>
                            </div>
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
                        <Button
                            onClick={openPopupFunc}
                            variant='contained'
                            className={styles.applyBtn}
                        >
                            {t('apply')}
                        </Button>
                    </div>
                </div>
                <div className={styles.hidingButton}>
                    <Button
                        onClick={openPopupFunc}
                        variant='contained'
                        className={styles.applyBtn}
                    >
                        {t('apply')}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SearchTableOrderCarrier;
