import { Banks } from 'src/interfaces/user';
import {
    IAddAsACarrierReturn,
    IApplyOrderReturn,
    IGetMyOrdersReturn,
    IGetOrderByIdReturn,
    IGetPayouts,
    ISuggestChanges,
} from '../interfaces/api/order';
import {
    ICreateOrderCarrier,
    ICreateOrderReciever,
    IOrder,
    IOrderFull,
} from '../interfaces/order';
import {
    carriersFilter,
    OrderSeachType,
    receiversFilter,
} from '../interfaces/order-search';
import { mainInstance } from './instance';

const getLanguage = () => localStorage.getItem('language');

export const addOrderAsACarrier = (
    requestData: ICreateOrderCarrier
): Promise<IAddAsACarrierReturn> =>
    mainInstance
        .post(
            '/order/create-order-as-carrier',
            JSON.stringify({ ...requestData, currency: 'RUB' }),
            { params: { language: getLanguage() } }
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
            JSON.stringify({ ...requestData, currency: 'RUB' }),
            { params: { language: getLanguage() } }
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
        .get('/order/get-my-orders', { params: { language: getLanguage() } })
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
    start: number;
    limit: number;
}): Promise<IGetMyOrdersReturn> =>
    mainInstance
        .post('/order/search-orders', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
        .then(data => {
            return {
                ok: true,
                orders: data.data.orders as IOrder[],
                count: data.data.count as number,
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
        .post('/order/apply-as-carrier', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
        .post('/order/apply-as-receiver', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
            params: { ...requestData, language: getLanguage() },
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
        .post(
            '/order/suggest-changes-by-carrier',
            JSON.stringify(requestData),
            { params: { language: getLanguage() } }
        )
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
        .post('/order/agree-with-changes', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
    completionCode: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/complete-order', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Complete order error',
            };
        });

export const cancelOrder = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/cancel-order', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
        .then(data => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ?? 'Error with cancel order',
            };
        });

export const disagreeWithChanges = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/disagree-with-changes', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
        .post('/order/confirm-deal', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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

export const declineOrder = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/decline-order', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ?? 'Error with decline order',
            };
        });

export const startPayout = (requestData: {
    orderId: string;
    phoneNumber: string;
    bank: Banks;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/start-payout', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
                    'Error with sending payout data',
            };
        });

export const getGoogleLozalizedName = (requestData: {
    place_id: string;
    language: string;
}): Promise<string> =>
    mainInstance
        .get('/get-localized-name', {
            params: { ...requestData, language: getLanguage() },
        })
        .then(data => {
            return data.data.address;
        })
        .catch(data => {
            return 'Load error';
        });

export const getPayouts = (): Promise<IGetPayouts> =>
    mainInstance
        .get('/get-payouts', {
            params: { language: getLanguage() },
        })
        .then(data => {
            return {
                payouts: data.data.payouts,
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error get payouts',
            };
        });

export const sendPurchaseData = (requestData: {
    files: File[];
    orderId: string;
}): Promise<ISuggestChanges> => {
    const formData = new FormData();

    for (const file of requestData.files) {
        formData.append('file', file);
    }

    formData.append('orderId', requestData.orderId);

    return mainInstance
        .post('/order/confirm-purchase', formData, {
            params: { language: getLanguage() },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
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
                    'Error with sending purchase data',
            };
        });
};

export const sendDataBeforePurchase = (requestData: {
    files: File[];
    orderId: string;
}): Promise<ISuggestChanges> => {
    const formData = new FormData();

    for (const file of requestData.files) {
        formData.append('file', file);
    }

    formData.append('orderId', requestData.orderId);

    return mainInstance
        .post('/order/before-purchase', formData, {
            params: { language: getLanguage() },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
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
                    'Error with sending data before purchase',
            };
        });
};

export const acceptReceiverAfterPurchaseData = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/approve-purchase', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
                    'Error with accepting receiver purchase data',
            };
        });

export const acceptReceiverBeforePurchaseData = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/approve-before-purchase', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
                    'Error with accepting receiver purchase data',
            };
        });

export const sendProductCode = (requestData: {
    orderId: string;
}): Promise<ISuggestChanges> =>
    mainInstance
        .post('/order/send-completion-code', JSON.stringify(requestData), {
            params: { language: getLanguage() },
        })
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
                    'Error with sending the product code',
            };
        });
