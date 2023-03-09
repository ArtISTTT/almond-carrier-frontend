import { getGoogleLozalizedName } from 'src/api/order';
import { getGooglePlaceDetails } from './../api/google';
import { IOrder, IOrderFull } from './../interfaces/order';
import dayjs from 'dayjs';
import { Language } from 'src/interfaces/settings';

export const parseOrderDataFromApi = async (
    orders: (IOrder | IOrderFull)[],
    language: Language
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
