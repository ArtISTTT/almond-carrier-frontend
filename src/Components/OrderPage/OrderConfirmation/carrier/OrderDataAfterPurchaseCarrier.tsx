import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { sendPurchaseData } from 'src/api/order';
import { OrderStatus } from 'src/interfaces/profile';
import styles from '../../../../../styles/OrderPage.module.css';
import DropFileInput from '../../../drop-file-input/DropFileInput';
import { OpenAlertContext } from '../../../Layouts/Snackbar';
import OrderPurchaseData from '../OrderPurchaseData';

type IProps = {
    orderStatus: OrderStatus;
    fileLinks?: string[];
    orderId: string;
    setIsDataSending: React.Dispatch<React.SetStateAction<boolean>>;
};

const allowedStatusesForPurchaseCarrier = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingPayout,
    OrderStatus.success,
    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation,
];

const OrderDataAfterPurchaseCarrier: React.FC<IProps> = ({
    orderStatus,
    fileLinks,
    orderId,
    setIsDataSending,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const confirmPurchaseData = async (fileList: File[]) => {
        setIsDataSending(true);
        const data = await sendPurchaseData({
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
            {orderStatus === OrderStatus.awaitingPurchase && (
                <div className={styles.afterPurchseCarrierBlock}>
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
                </div>
            )}
            {allowedStatusesForPurchaseCarrier.includes(orderStatus) && (
                <OrderPurchaseData fileLinks={fileLinks} />
            )}
        </>
    );
};

export default OrderDataAfterPurchaseCarrier;
