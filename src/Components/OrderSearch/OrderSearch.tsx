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
import ReceiverApplyPopup from './ReceiverApplyPopup';
import CarrierApplyPopup from './CarrierApplyPopup';

const OrderSearch: React.FC = () => {
    const [type, setType] = useState(OrderSeachType.carriers);
    const { reload, isLoading } = useSearchOrders();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(true);

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
            {/* {isPopupOpen &&
                (type === OrderSeachType.carriers ? (
                    <CarrierApplyPopup closePopup={setIsPopupOpen} />
                ) : (
                    <ReceiverApplyPopup closePopup={setIsPopupOpen} />
                ))} */}
            <TypeSwitcher setType={setType} type={type} />
            <div className={styles.content}>
                <SearchFilters
                    updateByFiltersAndType={updateByFiltersAndType}
                    type={type}
                />
                <SearchTable type={type} orders={orders} />
            </div>
        </div>
    );
};

export default OrderSearch;
