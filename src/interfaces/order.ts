import { Dayjs } from 'dayjs';
import { orderStatus } from './profile';

export interface IOrder {
    id: string;
    toLocation: string;
    fromLocation?: string;
    productName?: string;
    rewardAmount: number;
    productAmount?: number;
    productWeight?: number;
    productDescription?: string;
    carrierMaxWeight: number;
    arrivalDate?: Date;
    status: orderStatus;
    isPayed: boolean;
}

export interface ICreateOrderReciever {
    toLocation: string;
    fromLocation?: string;
    productName: string;
    rewardAmount: number;
    productAmount: number;
    productWeight: number;
    productDescription: string;
}

export interface ICreateOrderCarrier {
    toLocation: string;
    fromLocation: string;
    carrierMaxWeight: number;
    arrivalDate: Date;
    rewardAmount: number;
}
