import { useTranslation } from 'react-i18next';
import { OrderStatus } from '../../interfaces/profile';

export const useConvertStatusToText = () => {
    const { t } = useTranslation();

    return (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.cancelled:
                return t('cancelled');
            case OrderStatus.awaitingDelivery:
                return t('waitingForDelivery');
            case OrderStatus.inDiscussion:
                return t('inDiscussion');
            case OrderStatus.waitingForPayment:
                return 'waitingForPayment'; // ЛОКАЛИЗАЦИЯ
            case OrderStatus.waitingForPaymentVerification:
                return 'Подтверждение оплаты'; // ЛОКАЛИЗАЦИЯ
            case OrderStatus.waitingCarrier:
                return t('searchingForCarrier');
            case OrderStatus.waitingReciever:
                return t('searchingForReceiver');
            default:
                return t('success');
        }
    };
};
