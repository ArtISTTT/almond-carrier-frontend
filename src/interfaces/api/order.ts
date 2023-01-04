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
