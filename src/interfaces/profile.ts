import { Dayjs } from 'dayjs';

export interface IReview {
    id?: number;
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
    waitingForPaymentVerification = 'waitingForPaymentVerification',
    awaitingDelivery = 'awaitingDelivery',
    success = 'success',
    cancelled = 'cancelled',
}
