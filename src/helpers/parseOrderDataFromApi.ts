import { IOrder, IOrderFull } from './../interfaces/order';
import dayjs from 'dayjs';

export const parseOrderDataFromApi = async (
    orders: (IOrder | IOrderFull)[],
) =>
    await Promise.all(
        orders.map(async order => ({
            ...order,
            arrivalDate: order.arrivalDate
                ? dayjs(order.arrivalDate)
                : undefined,
            createdDate: dayjs(order.createdDate),
            fromLocation: order.fromLocation,
            toLocation: order.toLocation,
        }))
    );
