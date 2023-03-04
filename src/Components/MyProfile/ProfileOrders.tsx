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
import { useGetThisPageOrders } from 'src/redux/hooks/useGetThisPageOrders';

const ProfileOrders = () => {
    const orders = useSelector(selectMyOrders);
    const { reload, isLoading, error } = useLoadOwnOrders();
    const [page, setPage] = React.useState<number>(1);
    const thisPageOrders = useGetThisPageOrders({ orders, page });
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
