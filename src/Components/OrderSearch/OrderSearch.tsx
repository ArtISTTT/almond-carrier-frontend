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
import CarrierApplyPopup from './CarrierApplyPopup';
import ReceiverApplyPopup from './ReceiverApplyPopup';
import CircleLoader from '../Loaders/CircleLoader';
import { LoaderColors } from 'src/interfaces/loader';

const OrderSearch: React.FC = () => {
    const [type, setType] = useState(OrderSeachType.carriers);
    const { reload, isLoading } = useSearchOrders();
    const [applyedOrder, setApplyedOrder] = React.useState<IOrder>();
    const [orders, setOrders] = useState<IOrder[]>([]);

    const updateByFiltersAndType = async (
        data: carriersFilter | receiversFilter
    ) => {
        setOrders([]);
        const awaitedOrders = await reload(data, type);
        setOrders(awaitedOrders);
    };

    const closePopup = () => setApplyedOrder(undefined);

    useEffect(() => {
        updateByFiltersAndType({});
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
            </div>
        </div>
    );
};

export default OrderSearch;
