import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button } from '@mui/material';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

type IProps = {
    order: IOrder;
};

const SearchTableOrderCarrier: React.FC<IProps> = ({ order }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.itemWrapper}>
            <div className={cn(styles.part, styles.user)}>
                <Avatar
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt='logo'
                />
                <div className={styles.userInfo}>
                    <div className={styles.userName}>
                        {order.carrier?.firstName} {order.carrier?.lastName}
                    </div>
                    <div className={cn(styles.infoItem, styles.infoItemRating)}>
                        {t('rating')}: <span>4.64</span>
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
            <div className={cn(styles.part, styles.fromTo, styles.doubleditem)}>
                <div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>{t('from')}:</span>
                        <span>{order.fromLocation}</span>
                    </div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>{t('to')}:</span>
                        <span>{order.toLocation}</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.flightDate)}>
                {dayjs(order.arrivalDate as Date).format('YYYY.MM.DD')}
            </div>
            <div className={cn(styles.part, styles.benefit)}>
                {order.rewardAmount}$
            </div>
            <div className={cn(styles.part, styles.maxWeight)}>
                {order.carrierMaxWeight}
                {t('kg')}
            </div>
            <div className={cn(styles.part)}>
                <Button variant='contained' className={styles.applyBtn}>
                    {t('apply')}
                </Button>
            </div>
        </div>
    );
};

export default SearchTableOrderCarrier;
