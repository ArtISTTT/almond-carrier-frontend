import { IRecoverReturn } from '../interfaces/api/auth';
import {
    IAddAsACarrierReturn,
    IApplyOrderReturn,
    IGetMyOrdersReturn,
    IGetOrderByIdReturn,
    ISuggestChanges,
} from '../interfaces/api/order';
import {
    ICreateOrderCarrier,
    ICreateOrderReciever,
    IOrder,
    IOrderFull,
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
}): Promise<IApplyOrderReturn> =>
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
}): Promise<IApplyOrderReturn> =>
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

export const getOrderById = (requestData: {
    orderId: string;
}): Promise<IGetOrderByIdReturn> =>
    mainInstance
        .get('/order/get-order-by-id', {
            params: requestData,
        })
        .then(data => {
            return {
                ok: true,
                order: data.data.order as IOrderFull,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ?? 'Error while getting order',
            };
        });

export const suggestChangesByCarrier = (requestData: {
    changes: Partial<IOrder>;
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/suggest-changes-by-carrier', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ?? 'Error while getting order',
            };
        });

export const suggestChangesByReceiver = (requestData: {
    changes: Partial<IOrder>;
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/suggest-changes-by-receiver', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error while agree ',
            };
        });

export const agreeWithChanges = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/agree-with-changes', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ??
                    'Error with agreement with the changes ',
            };
        });

export const completeOrder = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/complete-order', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ??
                    'Error with agreement with the changes ',
            };
        });

export const disagreeWithChanges = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/disagree-with-changes', JSON.stringify(requestData))
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ??
                    'Error with rejecting the changes ',
            };
        });

export const confirmDeal = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/confirm-deal', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ??
                    'Error with confirming the deal',
            };
        });

export const confirmPayment = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/confirm-payment', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ??
                    'Error with confirming the payment',
            };
        });
