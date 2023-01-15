import { IOrder } from './../interfaces/order';
import dayjs from 'dayjs';

export const parseOrderDataFromApi = (orders: IOrder[]) =>
    orders.map(order => ({
        ...order,
        arrivalDate: dayjs(order.arrivalDate),
    }));
