import { IOrder } from './../interfaces/order';
import dayjs from 'dayjs';

export const parseOrderDataFromApi = (order: IOrder) => ({
    ...order,
    arrivalDate: dayjs(order.arrivalDate).format('DD.MM.YYYY'),
});
