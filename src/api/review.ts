import {
    IGetReviewsReturn,
    IReview,
    ISendReview,
} from 'src/interfaces/api/review';
import { mainInstance } from './instance';
import { ViewType } from 'src/Components/OrderPage/OrderInputItem';

export const sendReview = (requestData: {
    orderId: string;
    userForId: string;
    reviewerType: ViewType;
    text: string;
    rating: number;
}): Promise<ISendReview> =>
    mainInstance
        .post('/review/send', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error:
                    data.response?.data?.message ??
                    'Error with confirming the payment',
            };
        });

export const getReviews = (userId: string): Promise<IGetReviewsReturn> =>
    mainInstance
        .get('/review/user', {
            params: {
                userId,
            },
        })
        .then(data => {
            return {
                ok: true,
                reviews: data.data.reviews as IReview[],
            };
        })
        .catch(() => {
            return {
                ok: false,
            };
        });
