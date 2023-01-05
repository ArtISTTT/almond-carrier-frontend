import { IRecoverReturn } from '../interfaces/api/auth';
import {
    IAddAsACarrierReturn,
    IGetMyOrdersReturn,
} from '../interfaces/api/order';
import {
    ICreateOrderCarrier,
    ICreateOrderReciever,
    IOrder,
} from '../interfaces/order';
import { mainInstance } from './instance';

export const addOrderAsACarrier = (
    requestData: ICreateOrderCarrier
): Promise<IAddAsACarrierReturn> =>
    mainInstance
        .post('/order/create-order-as-carrier', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
                order: data.data.order,
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
        .post('/order/create-order-as-receiver', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
                order: data.data.order,
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
