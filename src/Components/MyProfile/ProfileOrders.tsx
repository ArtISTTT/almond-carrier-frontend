import React, { useEffect } from 'react';
import styles from '../../../styles/ProfileOrders.module.css';
import { Pagination, Typography } from '@mui/material';
import OrderItem from 'src/Components/OrderComponents/OrderItem';
import { useSelector } from 'react-redux';
import { selectMyOrders } from '../../redux/selectors/orders';
import { useLoadOwnOrders } from '../../redux/hooks/useLoadOwnOrders';
import cn from 'classnames';
import EmptyOrdersBlock from '../EmptyComponents/EmptyNoShadows';
import { useTranslation } from 'react-i18next';
import CircleLoader from '../Loaders/CircleLoader';
import { LoaderColors } from 'src/interfaces/loader';

const ProfileOrders = () => {
    const orders = useSelector(selectMyOrders);
    const { reload, isLoading, error } = useLoadOwnOrders();
    const { t } = useTranslation();

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
                {t('myOrders')}
            </Typography>
            {isLoading ? (
                <CircleLoader color={LoaderColors.PRIMARY} />
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
                        <EmptyOrdersBlock text={'youHaveNoOrdersYet'} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;
