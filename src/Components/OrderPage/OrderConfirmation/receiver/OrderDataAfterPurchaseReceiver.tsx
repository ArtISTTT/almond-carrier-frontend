import React from 'react';
import { OrderStatus } from 'src/interfaces/profile';
import OrderPurchaseData from '../OrderPurchaseData';
import OrderReceiverPhotoConfirmation from '../OrderReceiverPhotoConfirmation';

type IProps = {
    orderStatus: OrderStatus;
    fileLinks?: string[];
    acceptAfterPurchaseData: () => void;
    isReceiverDataBlockDisabled: boolean;
    orderId: string;
};

const allowedStatusesForPurchaseReceiver = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingPayout,
    OrderStatus.success,
];

const OrderDataAfterPurchaseReceiver: React.FC<IProps> = ({
    orderStatus,
    acceptAfterPurchaseData,
    fileLinks,
    isReceiverDataBlockDisabled,
    orderId,
}) => {
    return (
        <>
            {orderStatus ===
                OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation && (
                <OrderReceiverPhotoConfirmation
                    fileLinks={fileLinks}
                    acceptAfterPurchaseData={acceptAfterPurchaseData}
                    isReceiverDataBlockDisabled={isReceiverDataBlockDisabled}
                    orderStatus={orderStatus}
                    orderId={orderId}
                />
            )}
            {allowedStatusesForPurchaseReceiver.includes(orderStatus) && (
                <OrderPurchaseData fileLinks={fileLinks} />
            )}
        </>
    );
};

export default OrderDataAfterPurchaseReceiver;
