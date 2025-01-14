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
            case OrderStatus.awaitingRecieverItemBeforePurchasePhotosConfirmation:
                return t(
                    'awaitingRecieverItemBeforePurchasePhotosConfirmation'
                );
            case OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation:
                return t('awaitingRecieverItemPurchasePhotosConfirmation');
            case OrderStatus.awaitingPurchase:
                return t('awaitingPurchase');
            case OrderStatus.awaitingPayout:
                return t('awaitingPayout');
            case OrderStatus.awaitingDelivery:
                return t('waitingForDelivery');
            case OrderStatus.inDiscussion:
                return t('inDiscussion');
            case OrderStatus.waitingForPayment:
                return t('waitingForPayment');
            case OrderStatus.awaitingBeforePurchaseItemsFiles:
                return t('awaitingBeforePurchaseItemsFiles');
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
