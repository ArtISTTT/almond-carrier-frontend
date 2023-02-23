import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import TypeSwitcher from './TypeSwitcher';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../../interfaces/order-search';
import SearchFilters from './SearchFilters';
import SearchTable from './SearchTable';
import { useSearchOrders } from '../../redux/hooks/useSearchOrders';
import { IOrder } from '../../interfaces/order';
import CarrierApplyPopup from './CarrierApplyPopup';
import ReceiverApplyPopup from './ReceiverApplyPopup';
import CircleLoader from '../Loaders/CircleLoader';
import { LoaderColors } from 'src/interfaces/loader';
import { Pagination } from '@mui/material';

const OrderSearch: React.FC = () => {
    const [type, setType] = useState(OrderSeachType.carriers);
    const { reload, isLoading } = useSearchOrders();
    const [applyedOrder, setApplyedOrder] = React.useState<IOrder>();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [lastFilters, setLastFilters] = useState({});
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

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
                <Pagination
                    className={styles.pagination}
                    count={totalCount}
                    variant='outlined'
                    color='primary'
                    onChange={handleChangePagination}
                />
            </div>
        </div>
    );
};

export default OrderSearch;
