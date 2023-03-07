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
            fromLocation: order.fromLocation_placeId
                ? await getGoogleLozalizedName({
                      place_id: order.fromLocation_placeId,
                      language,
                  })
                : order.fromLocation,
            toLocation: order.toLocation_placeId
                ? await getGoogleLozalizedName({
                      place_id: order.toLocation_placeId,
                      language,
                  })
                : order.toLocation,
        }))
    );
