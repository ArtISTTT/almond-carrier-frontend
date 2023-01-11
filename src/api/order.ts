import { IRecoverReturn } from '../interfaces/api/auth';
import {
    IAddAsACarrierReturn,
    IGetApplyOrderReturn,
    IGetMyOrdersReturn,
} from '../interfaces/api/order';
import {
    ICreateOrderCarrier,
    ICreateOrderReciever,
    IOrder,
} from '../interfaces/order';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../interfaces/order-search';
import { mainInstance } from './instance';

export const addOrderAsACarrier = (
    requestData: ICreateOrderCarrier
): Promise<IAddAsACarrierReturn> =>
    mainInstance
        .post(
            '/order/create-order-as-carrier',
            JSON.stringify({ ...requestData, currency: 'RUB' })
        )
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const addOrderAsAReceiver = (
    requestData: ICreateOrderReciever
): Promise<IAddAsACarrierReturn> =>
    mainInstance
        .post(
            '/order/create-order-as-receiver',
            JSON.stringify({ ...requestData, currency: 'RUB' })
        )
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const getMyOrders = (): Promise<IGetMyOrdersReturn> =>
    mainInstance
        .get('/order/get-my-orders')
        .then(data => {
            return {
                ok: true,
                orders: data.data.orders as IOrder[],
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const searchOrders = (requestData: {
    filters: carriersFilter | receiversFilter;
    type: OrderSeachType;
}): Promise<IGetMyOrdersReturn> =>
    mainInstance
        .post('/order/search-orders', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
                orders: data.data.orders as IOrder[],
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const applyOrderAsCarrier = (requestData: {
    fromLocation?: string;
    fromLocation_placeId: string;
    arrivalDate: Date;
    orderId: string;
}): Promise<IGetApplyOrderReturn> =>
    mainInstance
        .post('/order/apply-as-carrier', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
                orderId: data.data.orderId as string,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const applyOrderAsReceiver = (requestData: {
    productName: string;
    productAmount: number | undefined;
    productWeight: number | undefined;
    productDescription: string;
    orderId: string;
}): Promise<IGetApplyOrderReturn> =>
    mainInstance
        .post('/order/apply-as-receiver', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
                orderId: data.data.orderId as string,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });
