import { Dayjs } from 'dayjs';
import { IOrderFull } from '../order';
import { Genders } from '../settings';

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
    gender?: Genders;
    id: string;
    lastName: string;
    avatar?: string;
    successOrders: IOrderFull[];
    verifiedByEmail: boolean;
    verifiedByPhone: boolean;
    ordersInLastMonth: IOrderFull[];
}
