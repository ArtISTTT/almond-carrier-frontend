import { Dayjs } from 'dayjs';
import { ViewType } from 'src/Components/OrderPage/OrderInputItem';
import { OrderStatus } from './profile';
import { Banks } from './user';

export interface IOrder {
    isOrderFromUserPage?: boolean;
    id: string;
    toLocation: string;
    toLocation_placeId: string;
    fromLocation?: string;
    createdDate: Dayjs;
    creatorId: string;
    setApplyedOrder?: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
    fromLocation_placeId?: string;
    productName?: string;
    payoutInfo: {
        bank: Banks;
        phoneNumber: string;
    };
    rewardAmount: number;
    productUri?: string;
    productAmount?: number;
    productWeight?: number;
    productDescription?: string;
    carrierMaxWeight: number;
    arrivalDate?: Dayjs;
    status: OrderStatus;
    isPayed: boolean;
    receiver?: {
        id: string;
        avatar?: string;
        rating: number;
        firstName: string;
        lastName: string;
    };
    carrier?: {
        id: string;
        avatar?: string;
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
    totalPaymentAmount?: number;
    partnerReview?: IPureReview;
}

export interface ICreateOrderReciever {
    toLocation: string;
    toLocation_placeId: string;
    fromLocation?: string;
    productUri?: string;
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
    productUri?: string;
    fromLocation_placeId: string;
    carrierMaxWeight: number | null;
    arrivalDate: Date;
    rewardAmount: number | null;
}

export interface IPayout {
    id: string;
    completedDate: string;
    productName: string;
    rewardAmount: number;
    bank?: string;
    phoneNumber: string;
    status: string;
}
