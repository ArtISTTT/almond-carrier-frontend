import React from 'react';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder, IOrderFull } from '../../interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { ViewType } from './OrderInputItem';
import { useTranslation } from 'react-i18next';

type IProps = {
    viewType: ViewType;
    suggestedChanged: Partial<IOrder> | undefined;
    hasByYouSuggestedChanged: boolean;
    order: IOrderFull;
};

const OrderLabels: React.FC<IProps> = ({
    viewType,
    suggestedChanged,
    hasByYouSuggestedChanged,
    order,
}) => {
    const { t } = useTranslation();

    return (
        <>
            {order.status === OrderStatus.inDiscussion && (
                <>
                    {suggestedChanged && (
                        <div className={styles.byOther}>
                            {t('HighlightedFieldsHaveBeenChanged')}
                        </div>
                    )}
                    {hasByYouSuggestedChanged && (
                        <div className={styles.byYou}>
                            {t('HighlightedFieldsHaveBeenChangedByYou')}
                        </div>
                    )}
                    {viewType === ViewType.receiver &&
                        order.dealConfirmedByReceiver &&
                        !order.dealConfirmedByCarrier && (
                            <div className={styles.confirmationString}>
                                {t('confirmationCarrier')}
                            </div>
                        )}
                    {viewType === ViewType.carrier &&
                        order.dealConfirmedByCarrier &&
                        !order.dealConfirmedByReceiver && (
                            <div className={styles.confirmationString}>
                                {t('confirmationReceiver')}
                            </div>
                        )}
                    {viewType === ViewType.receiver &&
                        order.dealConfirmedByCarrier &&
                        !order.dealConfirmedByReceiver && (
                            <div className={styles.confirmationString}>
                                {t('carrierWaitingYourConfirmation')}
                            </div>
                        )}
                    {viewType === ViewType.carrier &&
                        order.dealConfirmedByReceiver &&
                        !order.dealConfirmedByCarrier && (
                            <div className={styles.confirmationString}>
                                {t('receiverWaitingYourConfirmation')}
                            </div>
                        )}
                </>
            )}

            {order.status === OrderStatus.waitingForPaymentVerification && (
                <div className={styles.confirmationString}>
                    {t('WaitingPaymentConfirmation')}
                </div>
            )}

            {order.status === OrderStatus.awaitingDelivery && (
                <div className={styles.byOther}>
                    {t('PaymentConfirmed')} {order.arrivalDate?.format('LL')}
                </div>
            )}
        </>
    );
};

export default OrderLabels;
