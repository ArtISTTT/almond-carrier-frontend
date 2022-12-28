import { Dayjs } from 'dayjs';
export interface IOrder {
    status: string;
    item: string;
    from: string;
    to: string;
    reward: number;
    estimatedDate: Dayjs;
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
