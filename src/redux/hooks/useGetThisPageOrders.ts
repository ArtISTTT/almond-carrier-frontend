import { IOrder } from 'src/interfaces/order';

export const useGetThisPageOrders = ({
    orders,
    page,
}: {
    orders: IOrder[];
    page: number;
}) => {
    const pageOrders = orders.map((order, i) => {
        if (i < 4 * page && i > 4 * page - 5) {
            return order;
        } else {
            return null;
        }
    });

    const thisPageOrdersArray = pageOrders.filter(order => {
        return order !== null;
    });

    return thisPageOrdersArray as IOrder[];
};
