import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { OrderSeachType } from '../../interfaces/order-search';
import { Pagination } from '@mui/material';
import SearchTableOrderCarrier from './SearchTableOrderCarrier';
import SearchTableOrderReceiver from './SearchTableOrderReceiver';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import { useTranslation } from 'next-i18next';
import { parseOrderDataFromApi } from '../../helpers/parseOrderDataFromApi';

type IProps = {
    type: OrderSeachType;
    orders: IOrder[];
};

const SearchTable: React.FC<IProps> = ({ type, orders }) => {
    const { t } = useTranslation();
    const carriersHeaders = [
        { name: t('carrier'), long: true },
        { name: `${t('from')}/${t('to')}`, long: true },
        { name: t('arrivalDate') },
        { name: t('benefit') },
        { name: t('maxWeight') },
    ];

    const receiversHeaders = [
        { name: t('receiver'), long: true },
        { name: `${t('from')}/${t('to')}`, long: true },
        { name: t('productName') },
        { name: t('price/benefit') },
        { name: t('weight') },
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
                        })}
                        key={item.name}
                    >
                        {item.name}
                    </div>
                ))}
                <div className={styles.tableHeaderItem}></div>
            </div>

            <div>
                {orders.map(order =>
                    type === OrderSeachType.carriers ? (
                        <SearchTableOrderCarrier
                            order={parseOrderDataFromApi(order)}
                            key={order.id}
                        />
                    ) : (
                        <SearchTableOrderReceiver
                            order={order}
                            key={order.id}
                        />
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
