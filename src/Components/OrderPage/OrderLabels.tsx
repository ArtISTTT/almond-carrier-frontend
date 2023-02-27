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
                            {t('highlightedFieldsHaveBeenChanged')}
                        </div>
                    )}
                    {hasByYouSuggestedChanged && (
                        <div className={styles.byYou}>
                            {t('highlightedFieldsHaveBeenChangedByYou')}
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
                    {t('waitingPaymentConfirmation')}
                </div>
            )}

            {order.status === OrderStatus.awaitingDelivery && (
                <div className={styles.byOther}>
                    {t('paymentConfirmed')} {order.arrivalDate?.format('LL')}
                </div>
            )}
            {order.status === OrderStatus.success &&
                viewType === ViewType.carrier && (
                    <div className={styles.byOther}>{t('awaitingPayout')}</div>
                )}
        </>
    );
};

export default OrderLabels;
