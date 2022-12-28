import React from 'react';
import styles from '../../../styles/ProfileOrders.module.css';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import OrderItem from './OrderItem';
import { orderStatus } from '../../interfaces/profile';

const orders = [
    {
        status: orderStatus.success,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        status: orderStatus.cancelled,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
];

const ProfileOrders = () => {
    return (
        <div className={styles.ordersWrapper}>
            <Typography
                className={styles.orderTitle}
                variant='h4'
                component='h3'
            >
                My orders
            </Typography>
            <div className={styles.orders}>
                {orders.map((order, i) => (
                    <OrderItem
                        key={i}
                        status={order.status}
                        item={order.item}
                        from={order.from}
                        to={order.to}
                        reward={order.reward}
                        estimatedDate={order.estimatedDate}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfileOrders;
