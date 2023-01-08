import { orderStatus } from '../interfaces/profile';

export const convertStatusToText = (status: orderStatus): string => {
    switch (status) {
        case orderStatus.cancelled:
            return 'Cancelled';
        case orderStatus.awaitingDelivery:
            return 'Waiting for delivery';
        case orderStatus.inDiscussion:
            return 'In discussion';
        case orderStatus.waitingCarrier:
            return 'Searching for carrier';
        case orderStatus.waitingReciever:
            return 'Searching for receiver';
        case orderStatus.waitingForPayment:
            return 'waiting for payment';
        default:
            return 'Success';
    }
};
