import { getGooglePlaceDetails } from './../api/google';
import { IOrder, IOrderFull } from './../interfaces/order';
import dayjs from 'dayjs';
import { Language } from 'src/interfaces/settings';

export const parseOrderDataFromApi = (orders: (IOrder | IOrderFull)[]) =>
    orders.map(order => ({
        ...order,
        arrivalDate: order.arrivalDate ? dayjs(order.arrivalDate) : undefined,
        createdDate: dayjs(order.createdDate),
    }));
