import { Dayjs } from 'dayjs';
export interface IOrder {
    id?: number;
    status?: string;
    item?: string;
    from?: string;
    to?: string;
    reward?: string;
    estimatedDate?: Dayjs;
    currency?: string;
    suggestedBenefit?: string;
    weight?: string;
    description?: string;
}

export interface IReview {
    avatar: string;
    name: string;
    role: string;
    text: string;
    rating: number;
    benefit: number;
    date: Dayjs;
}

export enum orderStatus {
    waitingReciever = 'waitingReciever',
    waitingCarrier = 'waitingCarrier',
    inDiscussion = 'inDiscussion',
    waitingForPayment = 'waitingForPayment',
    awaitingDelivery = 'awaitingDelivery',
    confirmedByCarrier = 'confirmedByCarrier',
    confirmedByReciever = 'confirmedByReciever',
    success = 'success',
    cancelled = 'cancelled',
}
