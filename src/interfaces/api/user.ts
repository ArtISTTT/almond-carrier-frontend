import { Dayjs } from 'dayjs';
import { IOrderFull } from '../order';

export interface IGetUserReturn {
    ok: boolean;
    error?: string | undefined;
    user?: IGetUser;
}

export interface IGetUser {
    completedOrders: number;
    completedOrdersAsCarrier: number;
    completedOrdersAsReceiver: number;
    completionRate: number;
    dateOfBirth: Dayjs;
    firstName: string;
    fromLocation: string;
    gender?: string;
    id: string;
    lastName: string;
    avatar?: string;
    successOrders: IOrderFull[];
    verifiedByEmail: boolean;
    verifiedByPhone: boolean;
    ordersInLastMonth: IOrderFull[];
}
