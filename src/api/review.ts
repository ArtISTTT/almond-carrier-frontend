import { ISendReview } from 'src/interfaces/api/review';
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
