import { IOrder, IOrderFull, IPayout } from '../order';

export type IAddAsACarrierReturn = {
    error?: string | undefined;
    ok: boolean;
    order?: IOrder;
};

export type IGetMyOrdersReturn = {
    error?: string | undefined;
    ok: boolean;
    orders?: IOrder[];
    count?: number;
};

export type IApplyOrderReturn = {
    error?: string | undefined;
    ok: boolean;
    orderId?: string;
};

export type IGetOrderByIdReturn = {
    error?: string | undefined;
    ok: boolean;
    order?: IOrderFull;
};

export type ISuggestChanges = {
    error?: string | undefined;
    ok: boolean;
};

export type IGetPayouts = {
    payouts?: IPayout[];
    error?: string | undefined;
    ok: boolean;
};
