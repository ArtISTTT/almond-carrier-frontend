import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { sendDataBeforePurchase } from 'src/api/order';
import DropFileInput from 'src/Components/drop-file-input/DropFileInput';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import { OrderStatus } from 'src/interfaces/profile';
import styles from '../../../../../styles/OrderPage.module.css';
import OrderPurchaseData from '../OrderPurchaseData';

const allowedStatusesForBeforePurchaseCarrier = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingPayout,
    OrderStatus.awaitingPurchase,
    OrderStatus.awaitingBeforePurchaseItemsFiles,
    OrderStatus.awaitingRecieverItemBeforePurchasePhotosConfirmation,
    OrderStatus.success,
    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation,
];

type IProps = {
    orderStatus: OrderStatus;
    fileLinks?: string[];
    beforePurchasingItemFiles?: string[];
    orderId: string;
    setIsDataSending: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderDataBeforePurchaseCarrier: React.FC<IProps> = ({
    orderStatus,
    beforePurchasingItemFiles,
    fileLinks,
    orderId,
    setIsDataSending,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const confirmPurchaseData = async (fileList: File[]) => {
        setIsDataSending(true);
        const data = await sendDataBeforePurchase({
            files: fileList,
            orderId,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('dataUploadedSuccessfully'),
            });
            setIsDataSending(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: t('errorDataUploaded'),
            });
            setIsDataSending(false);
        }
    };

    return (
        <>
            {orderStatus === OrderStatus.awaitingBeforePurchaseItemsFiles && (
                <>
                    <Typography
                        variant='h6'
                        component='h4'
                        className={styles.detailsBlock}
                    >
                        {t('addTheFilesNeededConfirmYourPurchase')}
                    </Typography>

                    <DropFileInput
                        confirmPurchaseData={confirmPurchaseData}
                        buttonText='confirm'
                    />
                </>
            )}
            {allowedStatusesForBeforePurchaseCarrier.includes(orderStatus) && (
                <OrderPurchaseData fileLinks={beforePurchasingItemFiles} />
            )}
        </>
    );
};

export default OrderDataBeforePurchaseCarrier;
