import React from 'react';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder, IOrderFull } from '../../interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { ViewType } from './OrderInputItem';

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
    return (
        <>
            {order.status === OrderStatus.inDiscussion && (
                <>
                    {suggestedChanged && (
                        <div className={styles.byOther}>
                            Highlighted fields have been changed and are waiting
                            for your confirmation
                        </div>
                    )}
                    {hasByYouSuggestedChanged && (
                        <div className={styles.byYou}>
                            Highlighted fields have been changed by you and are
                            waiting for confirmation
                        </div>
                    )}
                    {viewType === ViewType.receiver &&
                        order.dealConfirmedByReceiver &&
                        !order.dealConfirmedByCarrier && (
                            <div className={styles.confirmationString}>
                                Waiting for confirmation of the carrier
                            </div>
                        )}
                    {viewType === ViewType.carrier &&
                        order.dealConfirmedByCarrier &&
                        !order.dealConfirmedByReceiver && (
                            <div className={styles.confirmationString}>
                                Waiting for confirmation of the receiver
                            </div>
                        )}
                    {viewType === ViewType.receiver &&
                        order.dealConfirmedByCarrier &&
                        !order.dealConfirmedByReceiver && (
                            <div className={styles.confirmationString}>
                                The carrier is waiting for your confirmation to
                                start the deal
                            </div>
                        )}
                    {viewType === ViewType.carrier &&
                        order.dealConfirmedByReceiver &&
                        !order.dealConfirmedByCarrier && (
                            <div className={styles.confirmationString}>
                                The receiver is waiting for your confirmation to
                                start the deal
                            </div>
                        )}
                </>
            )}

            {order.status === OrderStatus.waitingForPaymentVerification && (
                <div className={styles.confirmationString}>
                    Waiting for payment confirmation
                </div>
            )}
        </>
    );
};

export default OrderLabels;
