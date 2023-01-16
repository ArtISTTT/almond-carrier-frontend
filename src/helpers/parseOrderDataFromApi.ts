import { IOrder, IOrderFull } from './../interfaces/order';
import dayjs from 'dayjs';

export const parseOrderDataFromApi = (orders: (IOrder | IOrderFull)[]) =>
    orders.map(order => ({
        ...order,
        arrivalDate: dayjs(order.arrivalDate),
    }));
