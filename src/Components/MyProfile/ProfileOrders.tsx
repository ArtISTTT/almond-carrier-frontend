import { Pagination, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import OrderItem from 'src/Components/OrderComponents/OrderItem';
import { LoaderColors } from 'src/interfaces/loader';
import { useGetCurrentPageOrders } from 'src/redux/hooks/useGetCurrentPage';
import styles from '../../../styles/ProfileOrders.module.css';
import { useLoadOwnOrders } from '../../redux/hooks/useLoadOwnOrders';
import { selectMyOrders } from '../../redux/selectors/orders';
import EmptyOrdersBlock from '../EmptyComponents/EmptyNoShadows';
import CircleLoader from '../Loaders/CircleLoader';

const ProfileOrders = () => {
    const orders = useSelector(selectMyOrders);
    const { reload, isLoading, error } = useLoadOwnOrders();
    const [page, setPage] = React.useState<number>(1);
    const thisPageOrders = useGetCurrentPageOrders({ orders, page });
    const { t } = useTranslation();

    const totalCountPages = React.useMemo(() => {
        return Math.ceil(orders.length / 4);
    }, [orders]);

    useEffect(() => {
        reload();
    }, []);

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

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
                                {thisPageOrders.map((order, i) => (
                                    <OrderItem key={i} {...order} />
                                ))}
                            </div>
                            {totalCountPages > 1 && (
                                <Pagination
                                    className={styles.pagination}
                                    count={totalCountPages}
                                    variant='outlined'
                                    color='primary'
                                    onChange={handleChangePagination}
                                />
                            )}
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
