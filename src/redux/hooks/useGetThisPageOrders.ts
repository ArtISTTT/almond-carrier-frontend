import { IOrder } from 'src/interfaces/order';
import React from 'react';

interface IProps {
    orders: IOrder[];
    page: number;
}

export const useGetThisPageOrders = ({ orders, page }: IProps) => {
    const [start, end] = React.useMemo(() => [page * 4 - 4, page * 4], [page]);
    return orders.slice(start, end) as IOrder[];
};
