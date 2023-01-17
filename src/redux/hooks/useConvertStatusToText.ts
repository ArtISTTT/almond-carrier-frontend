import { useTranslation } from 'react-i18next';
import { orderStatus } from '../../interfaces/profile';

export const useConvertStatusToText = () => {
    const { t } = useTranslation();

    return (status: orderStatus) => {
        switch (status) {
            case orderStatus.cancelled:
                return t('cancelled');
            case orderStatus.awaitingDelivery:
                return t('waitingForDelivery');
            case orderStatus.inDiscussion:
                return t('inDiscussion');
            case orderStatus.waitingCarrier:
                return t('searchingForCarrier');
            case orderStatus.waitingReciever:
                return t('searchingForReceiver');
            case orderStatus.waitingForPayment:
                return t('waitingForPayment');
            default:
                return t('success');
        }
    };
};
