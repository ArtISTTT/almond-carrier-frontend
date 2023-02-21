import { Dayjs } from 'dayjs';
import { OrderStatus } from './profile';
import { ViewType } from 'src/Components/OrderPage/OrderInputItem';

export interface IOrder {
    id: string;
    toLocation: string;
    toLocation_placeId: string;
    fromLocation?: string;
    fromLocation_placeId?: string;
    productName?: string;
    rewardAmount: number;
    productAmount?: number;
    productWeight?: number;
    productDescription?: string;
    carrierMaxWeight: number;
    arrivalDate?: Dayjs;
    status: OrderStatus;
    isPayed: boolean;
    receiver?: {
        id: string;
        rating: number;
        firstName: string;
        lastName: string;
    };
    carrier?: {
        id: string;
        rating: number;
        firstName: string;
        lastName: string;
    };
}

export type IPureReview = {
    _id: string;
    orderId: string;
    rating: number;
    reviewerType: ViewType;
    text: string;
    userForId: string;
    userReviewerId: string;
};

export interface IOrderFull extends IOrder {
    byCarrierSuggestedChanges?: Partial<IOrder>;
    byReceiverSuggestedChanges?: Partial<IOrder>;
    dealConfirmedByCarrier?: boolean;
    dealConfirmedByReceiver?: boolean;
    myReview?: IPureReview;
    partnerReview?: IPureReview;
}

export interface ICreateOrderReciever {
    toLocation: string;
    toLocation_placeId: string;
    fromLocation?: string;
    productLink?: string;
    fromLocation_placeId?: string;
    productName: string;
    rewardAmount: number | null;
    productAmount: number | null;
    productWeight: number | null;
    productDescription: string;
}

export interface ICreateOrderCarrier {
    toLocation: string;
    toLocation_placeId: string;
    fromLocation: string;
    productLink?: string;
    fromLocation_placeId: string;
    carrierMaxWeight: number | null;
    arrivalDate: Date;
    rewardAmount: number | null;
}
