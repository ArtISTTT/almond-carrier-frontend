import React from 'react';
import { IOrder, IPayout } from 'src/interfaces/order';

interface IProps {
    orders: IOrder[];
    page: number;
}

interface IPropsPayout {
    payouts: IPayout[];
    page: number;
}

export const useGetThisPageOrders = ({ orders, page }: IProps) => {
    const [start, end] = React.useMemo(() => [page * 4 - 4, page * 4], [page]);
    return orders.slice(start, end) as IOrder[];
};

export const useGetThisPagePayouts = ({ payouts, page }: IPropsPayout) => {
    const [start, end] = React.useMemo(() => [page * 8 - 8, page * 8], [page]);
    return payouts.slice(start, end) as IPayout[];
};
