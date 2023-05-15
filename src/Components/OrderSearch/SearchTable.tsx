import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { IOrder } from '../../interfaces/order';
import { OrderSeachType } from '../../interfaces/order-search';
import SearchTableOrderCarrier from './SearchTableOrderCarrier';
import SearchTableOrderReceiver from './SearchTableOrderReceiver';

type IProps = {
    type: OrderSeachType;
    orders: IOrder[];
    setApplyedOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
};
const SearchTable: React.FC<IProps> = ({ type, orders, setApplyedOrder }) => {
    const [isFastLoginPopupOpen, setIsFastLoginPopupOpen] =
        React.useState<boolean>(false);
    const [isRedirectPopupOpen, setIsRedirectPopupOpen] =
        React.useState<boolean>(false);

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
                            isFastLoginPopupOpen={isFastLoginPopupOpen}
                            setIsFastLoginPopupOpen={setIsFastLoginPopupOpen}
                            setApplyedOrder={setApplyedOrder}
                            order={order}
                            setIsRedirectPopupOpen={setIsRedirectPopupOpen}
                            isRedirectPopupOpen={isRedirectPopupOpen}
                            key={order.id}
                        />
                    ) : (
                        <SearchTableOrderReceiver
                            isFastLoginPopupOpen={isFastLoginPopupOpen}
                            setIsFastLoginPopupOpen={setIsFastLoginPopupOpen}
                            setApplyedOrder={setApplyedOrder}
                            order={order}
                            setIsRedirectPopupOpen={setIsRedirectPopupOpen}
                            isRedirectPopupOpen={isRedirectPopupOpen}
                            key={order.id}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default SearchTable;
