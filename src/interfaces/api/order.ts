import { IOrder } from '../order';

export type IAddAsACarrierReturn = {
    error?: string | undefined;
    ok: boolean;
    order?: IOrder;
};
