import { IOrder } from './../interfaces/order';
import dayjs from 'dayjs';

export const parseUserDataFromApi = (order: IOrder) => ({
    ...order,
    arrivalDate: dayjs(order.arrivalDate).format('DD.MM.YYYY'),
});
