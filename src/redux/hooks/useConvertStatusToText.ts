import { useTranslation } from 'react-i18next';
import { OrderStatus } from '../../interfaces/profile';

export const useConvertStatusToText = () => {
    const { t } = useTranslation();

    return (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.cancelled:
                return t('cancelled');
            case OrderStatus.itemRecieved:
                return t('itemReceived');
            case OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation:
                return 'переведи статус awaitingRecieverItemPurchasePhotosConfirmation';
            case OrderStatus.awaitingPurchase:
                return 'переведи статус awaitingPurchase';
            case OrderStatus.awaitingPayout:
                return t('awaitingPayout');
            case OrderStatus.awaitingDelivery:
                return t('waitingForDelivery');
            case OrderStatus.inDiscussion:
                return t('inDiscussion');
            case OrderStatus.waitingForPayment:
                return t('waitingForPayment');
            case OrderStatus.waitingForPaymentVerification:
                return t('waitingForPaymentVerification');
            case OrderStatus.waitingCarrier:
                return t('searchingForCarrier');
            case OrderStatus.waitingReciever:
                return t('searchingForReceiver');
            default:
                return t('success');
        }
    };
};
