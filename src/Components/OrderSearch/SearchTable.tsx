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
import { useTranslation } from 'next-i18next';

type IProps = {
    type: OrderSeachType;
    orders: IOrder[];
    setApplyedOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
};
const n = 4;
const SearchTable: React.FC<IProps> = ({ type, orders, setApplyedOrder }) => {
    const { t } = useTranslation();
    const carriersHeaders = [
        { name: t('carrier'), long: true },
        { name: `${t('from')}/${t('to')}`, long: true },
        { name: t('arrivalDate') },
        { name: t('benefit') },
        { name: t('maxWeight'), short: true },
    ];

    const receiversHeaders = [
        { name: t('receiver'), long: true },
        { name: `${t('from')}/${t('to')}`, long: true },
        { name: t('product') },
        { name: t('price/benefit') },
        { name: t('weight'), short: true },
    ];

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
                            [styles.short]: item.short,
                        })}
                        key={item.name}
                    >
                        {item.name}
                    </div>
                ))}
                <div
                    className={cn(
                        styles.tableHeaderItem,
                        styles.tableHeaderItemNone,
                        styles.short
                    )}
                ></div>
            </div>

            <div>
                {orders.map(order =>
                    type === OrderSeachType.carriers ? (
                        <SearchTableOrderCarrier
                            setApplyedOrder={setApplyedOrder}
                            order={order}
                            key={order.id}
                        />
                    ) : (
                        <SearchTableOrderReceiver
                            setApplyedOrder={setApplyedOrder}
                            order={order}
                            key={order.id}
                        />
                    )
                )}
            </div>
            <Pagination
                className={styles.pagination}
                count={n}
                variant='outlined'
                color='primary'
            />
        </div>
    );
};

export default SearchTable;
