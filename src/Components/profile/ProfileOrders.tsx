import React, { useEffect } from 'react';
import styles from '../../../styles/ProfileOrders.module.css';
import { Pagination, Typography } from '@mui/material';
import OrderItem from '../orders/OrderItem';
import { useSelector } from 'react-redux';
import { selectMyOrders } from '../../redux/selectors/orders';
import { useLoadOwnOrders } from '../../redux/hooks/useLoadOwnOrders';
import OrderLoader from '../OrderLoader';
import cn from 'classnames';

const ProfileOrders = () => {
    const orders = useSelector(selectMyOrders);
    const { reload, isLoading, error } = useLoadOwnOrders();

    useEffect(() => {
        reload();
    }, []);

    return (
        <div className={styles.ordersWrapper}>
            <Typography
                className={styles.orderTitle}
                variant='h4'
                component='h3'
            >
                My orders
            </Typography>
            {isLoading ? (
                <OrderLoader />
            ) : (
                <div
                    className={cn(styles.ordersList, {
                        [styles.emptyOrders]: orders.length === 0,
                    })}
                >
                    {orders.length > 0 && (
                        <>
                            <div className={styles.orders}>
                                {orders.map((order, i) => (
                                    <OrderItem key={i} {...order} />
                                ))}
                            </div>
                            <Pagination
                                className={styles.pagination}
                                count={Math.round(orders.length / 5)}
                                variant='outlined'
                                color='primary'
                            />
                        </>
                    )}
                    {orders.length === 0 && (
                        <div className={styles.emptyText}>
                            You don't have any orders yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;
