import { Pagination } from '@mui/material';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoaderColors } from 'src/interfaces/loader';
import styles from '../../../styles/OrderSearch.module.css';
import { IOrder } from '../../interfaces/order';
import {
    carriersFilter,
    OrderSeachType,
    receiversFilter,
} from '../../interfaces/order-search';
import { useSearchOrders } from '../../redux/hooks/useSearchOrders';
import CircleLoader from '../Loaders/CircleLoader';
import CarrierApplyPopup from './CarrierApplyPopup';
import ReceiverApplyPopup from './ReceiverApplyPopup';
import SearchFilters from './SearchFilters';
import SearchTable from './SearchTable';
import TypeSwitcher from './TypeSwitcher';

const OrderSearch: React.FC = () => {
    const [type, setType] = useState(OrderSeachType.carriers);
    const { reload, isLoading } = useSearchOrders();
    const [applyedOrder, setApplyedOrder] = React.useState<IOrder>();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [lastFilters, setLastFilters] = useState({});
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const { t } = useTranslation();

    const updateByFiltersAndType = async (
        data?: carriersFilter | receiversFilter,
        pageNumber?: number
    ) => {
        setOrders([]);
        if (data) {
            setLastFilters(data);
            const { orders, count } = await reload(
                data,
                type,
                pageNumber ?? page
            );
            setOrders(orders);
            setTotalCount(count);
        } else {
            const { orders, count } = await reload(
                lastFilters,
                type,
                pageNumber ?? page
            );
            setOrders(orders);
            setTotalCount(count);
        }
    };

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        await updateByFiltersAndType(undefined, value);
    };

    const closePopup = () => setApplyedOrder(undefined);

    useEffect(() => {
        updateByFiltersAndType();
    }, [type]);

    if (applyedOrder) {
        return (
            <>
                {type === OrderSeachType.carriers ? (
                    <CarrierApplyPopup
                        order={applyedOrder}
                        closePopup={closePopup}
                    />
                ) : (
                    <ReceiverApplyPopup
                        order={applyedOrder}
                        closePopup={closePopup}
                    />
                )}
            </>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Friendly carrier - Orders search</title>
                <meta
                    name='description'
                    content={
                        t('searchForDeliveryOrOrderingSomeGoods') as string
                    }
                />
                <meta
                    property='og:title'
                    content={t('friendlyCarrierP2PDeliveryPlatform') as string}
                />
                <meta
                    property='og:description'
                    content={
                        t('searchForDeliveryOrOrderingSomeGoods') as string
                    }
                />
                <meta
                    property='og:url'
                    content='https://friendlycarrier.com/order-search'
                />
                <meta property='og:type' content='website' />
                <meta
                    property='v:url'
                    content='https://friendlycarrier.com/order-search'
                />
            </Head>
            <TypeSwitcher setType={setType} type={type} />
            <div className={styles.content}>
                <SearchFilters
                    updateByFiltersAndType={updateByFiltersAndType}
                    type={type}
                />
                {isLoading ? (
                    <div className={styles.loaderWrapper}>
                        <CircleLoader color={LoaderColors.PRIMARY} />
                    </div>
                ) : (
                    <SearchTable
                        setApplyedOrder={setApplyedOrder}
                        type={type}
                        orders={orders}
                    />
                )}
                {totalCount > 1 && (
                    <Pagination
                        className={styles.pagination}
                        count={totalCount}
                        variant='outlined'
                        color='primary'
                        onChange={handleChangePagination}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderSearch;
