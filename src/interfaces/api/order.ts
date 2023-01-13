import { IOrder } from '../order';

export type IAddAsACarrierReturn = {
    error?: string | undefined;
    ok: boolean;
    order?: IOrder;
};

export type IGetMyOrdersReturn = {
    error?: string | undefined;
    ok: boolean;
    orders?: IOrder[];
};

export type IApplyOrderReturn = {
    error?: string | undefined;
    ok: boolean;
    orderId?: string;
};

export type IGetOrderByIdReturn = {
    error?: string | undefined;
    ok: boolean;
    order?: IOrder;
};
