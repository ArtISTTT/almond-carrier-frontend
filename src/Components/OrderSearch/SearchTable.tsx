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
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';

const carriersHeaders = [
    { name: 'Carrier', long: true },
    { name: 'From/To', long: true },
    { name: 'Arrival date' },
    { name: 'Benefit' },
    { name: 'Max weight' },
];

const receiversHeaders = [
    { name: 'Receiver', long: true },
    { name: 'From/To', long: true },
    { name: 'Product name' },
    { name: 'Price/Benefit' },
    { name: 'Weight' },
];

type IProps = {
    type: OrderSeachType;
    orders: IOrder[];
};

const SearchTable: React.FC<IProps> = ({ type, orders }) => {
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
                    <div
                        className={cn(styles.tableHeaderItem, {
                            [styles.long]: item.long,
                        })}
                    >
                        {item.name}
                    </div>
                ))}
                <div className={styles.tableHeaderItem}></div>
            </div>

            <div>
                {orders.map(order =>
                    type === OrderSeachType.carriers ? (
                        <SearchTableOrderCarrier order={order} />
                    ) : (
                        <SearchTableOrderReceiver order={order} />
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
