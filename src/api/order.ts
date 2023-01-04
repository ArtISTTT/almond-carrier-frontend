import { IRecoverReturn } from '../interfaces/api/auth';
import { IAddAsACarrierReturn } from '../interfaces/api/order';
import { ICreateOrderCarrier } from '../interfaces/order';
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
