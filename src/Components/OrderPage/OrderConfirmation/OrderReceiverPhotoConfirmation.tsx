import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoaderColors } from 'src/interfaces/loader';
import { OrderStatus } from 'src/interfaces/profile';
import styles from '../../../../styles/OrderPage.module.css';
import CircleLoader from '../../Loaders/CircleLoader';
import OrderPurchaseData from './OrderPurchaseData';

type IProps = {
    fileLinks?: string[];
    orderId: string;
    isReceiverDataBlockDisabled: boolean;
    acceptAfterPurchaseData: () => void;
    orderStatus: OrderStatus;
};

const allowedStatusesForPurchaseButtons = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingPayout,
    OrderStatus.success,
];

const OrderReceiverPhotoConfirmation: React.FC<IProps> = ({
    fileLinks,
    orderStatus,
    isReceiverDataBlockDisabled,
    acceptAfterPurchaseData,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <OrderPurchaseData fileLinks={fileLinks} />

            {isReceiverDataBlockDisabled && (
                <div className={styles.purchaseLoaderWrapper}>
                    <CircleLoader color={LoaderColors.PRIMARY} />
                </div>
            )}

            {!allowedStatusesForPurchaseButtons.includes(orderStatus) && (
                <Button
                    variant='contained'
                    onClick={acceptAfterPurchaseData}
                    disabled={isReceiverDataBlockDisabled}
                    className={styles.acceptPurchaseButton}
                    color='primary'
                >
                    {t('approve')}
                </Button>
            )}
        </>
    );
};

export default OrderReceiverPhotoConfirmation;
