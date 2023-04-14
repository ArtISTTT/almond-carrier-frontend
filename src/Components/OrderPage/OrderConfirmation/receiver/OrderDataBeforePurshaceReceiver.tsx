import React from 'react';
import { OrderStatus } from 'src/interfaces/profile';
import OrderPurchaseData from '../OrderPurchaseData';
import OrderReceiverPhotoConfirmation from '../OrderReceiverPhotoConfirmation';

const allowedStatusesForPurchaseReceiver = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation,
    OrderStatus.awaitingPayout,
    OrderStatus.awaitingPurchase,
    OrderStatus.success,
];

type IProps = {
    orderStatus: OrderStatus;
    fileLinks?: string[];
    acceptAfterPurchaseData: () => void;
    isReceiverDataBlockDisabled: boolean;
    orderId: string;
};

const OrderDataBeforePurshaceReceiver: React.FC<IProps> = ({
    orderStatus,
    acceptAfterPurchaseData,
    fileLinks,
    isReceiverDataBlockDisabled,
    orderId,
}) => {
    return (
        <>
            {orderStatus ===
                OrderStatus.awaitingRecieverItemBeforePurchasePhotosConfirmation && (
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

export default OrderDataBeforePurshaceReceiver;
