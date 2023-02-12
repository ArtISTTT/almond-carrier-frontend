import React, { useEffect, useState } from 'react';
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
import OrderLoader from '../Loaders/OrderLoader';

const OrderSearch: React.FC = () => {
    const [type, setType] = useState(OrderSeachType.carriers);
    const { reload, isLoading } = useSearchOrders();
    const [orders, setOrders] = useState<IOrder[]>([]);

    const updateByFiltersAndType = async (
        data: carriersFilter | receiversFilter
    ) => {
        setOrders([]);
        const awaitedOrders = await reload(data, type);
        setOrders(awaitedOrders);
    };

    useEffect(() => {
        updateByFiltersAndType({});
    }, [type]);

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
                        <OrderLoader />
                    </div>
                ) : (
                    <SearchTable type={type} orders={orders} />
                )}
            </div>
        </div>
    );
};

export default OrderSearch;
