import React, { useState } from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import TypeSwitcher from './TypeSwitcher';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../../interfaces/order-search';
import SearchFilters from './SearchFilters';
import SearchTable from './SearchTable';

const OrderSearch: React.FC = () => {
    const [type, setType] = useState(OrderSeachType.carriers);

    const updateByFiltersAndType = async (
        data: carriersFilter | receiversFilter
    ) => {
        console.log(data);
    };

    return (
        <div className={styles.wrapper}>
            <TypeSwitcher setType={setType} type={type} />
            <div className={styles.content}>
                <SearchFilters
                    updateByFiltersAndType={updateByFiltersAndType}
                    type={type}
                />
                <SearchTable type={type} />
            </div>
        </div>
    );
};

export default OrderSearch;
