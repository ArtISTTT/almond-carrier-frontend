import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../../interfaces/order-search';
import { Pagination } from '@mui/material';
import SearchTableOrderCarrier from './SearchTableOrderCarrier';
import SearchTableOrderReceiver from './SearchTableOrderReceiver';

const carriersHeaders = [
    'Carrier',
    'From/To',
    'Arrival date',
    'Benefit',
    'Max weight',
];

const receiversHeaders = [
    'Receiver',
    'From/To',
    'Product name',
    'Price/Benefit',
    'Weight',
];

type IProps = {
    type: OrderSeachType;
};

const SearchTable: React.FC<IProps> = ({ type }) => {
    const updateByFiltersAndType = async (
        data: carriersFilter | receiversFilter
    ) => {
        console.log(data);
    };

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
                {(type === OrderSeachType.carriers
                    ? carriersHeaders
                    : receiversHeaders
                ).map(item => (
                    <div className={styles.tableHeaderItem}>{item}</div>
                ))}
                <div className={styles.tableHeaderItem}></div>
            </div>

            <div>
                {[1, 2, 3, 4].map(() =>
                    type === OrderSeachType.carriers ? (
                        <SearchTableOrderCarrier />
                    ) : (
                        <SearchTableOrderReceiver />
                    )
                )}
            </div>
            <Pagination
                className={styles.pagination}
                count={3}
                variant='outlined'
                color='primary'
            />
        </div>
    );
};

export default SearchTable;
