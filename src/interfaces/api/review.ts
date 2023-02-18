import { Dayjs } from 'dayjs';
import { ViewType } from 'src/Components/OrderPage/OrderInputItem';
import { Currency } from '../settings';

export type ISendReview = {
    error?: string | undefined;
    ok: boolean;
    message?: string | undefined;
};

export interface IReview {
    _id: number;
    reviewerType: ViewType;
    text: string;
    rating: number;
    userReviewer: {
        avatarImage: string;
        firstName: string;
        lastName: string;
    };
    order: {
        productName: string;
        completedDate: Dayjs;
    };
    payment: {
        rewardAmount: number;
        currency: Currency;
    };
}

export type IGetReviewsReturn =
    | {
          reviews: IReview[];
          ok: true;
      }
    | { ok: false };
