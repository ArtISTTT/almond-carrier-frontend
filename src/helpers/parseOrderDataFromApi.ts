import { getGooglePlaceDetails } from './../api/google';
import { IOrder, IOrderFull } from './../interfaces/order';
import dayjs from 'dayjs';
import { Language } from 'src/interfaces/settings';

export const parseOrderDataFromApi = async (
    orders: (IOrder | IOrderFull)[]
) => {
    return await Promise.all(
        orders.map(async order => {
            const fromLocation = order.fromLocation_placeId
                ? await getGooglePlaceDetails(
                      order.fromLocation_placeId,
                      Language.RU
                  )
                : '';

            const toLocation = order.toLocation_placeId
                ? await getGooglePlaceDetails(
                      order.toLocation_placeId,
                      Language.RU
                  )
                : '';

            return {
                ...order,
                fromLocation,
                toLocation,
                arrivalDate: dayjs(order.arrivalDate),
            };
        })
    );
};
