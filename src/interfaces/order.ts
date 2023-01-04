import { Dayjs } from 'dayjs';

export interface IOrder {
    id?: number;
    status?: string;
    item?: string;
    from?: string;
    to?: string;
    reward?: number;
    estimatedDate?: Dayjs;
    currency?: string;
    suggestedBenefit?: number;
    weight?: string;
    description?: string;
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
