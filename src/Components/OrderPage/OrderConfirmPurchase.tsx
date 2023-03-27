import { Button, Collapse, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendPurchaseData } from 'src/api/order';
import { LoaderColors } from 'src/interfaces/loader';
import styles from '../../../styles/OrderPage.module.css';
import DropFileInput from '../drop-file-input/DropFileInput';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CircleLoader from '../Loaders/CircleLoader';

type IProps = {
    orderId: string;
};

const OrderConfirmPurchase: React.FC<IProps> = ({ orderId }) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const [paymentOpened, setPaymentOpened] = useState<boolean>(false);
    const [isDataSent, setIsDataSent] = useState<boolean>(false);
    const [isDataSending, setIsDataSending] = useState<boolean>(false);

    const handleChange = () => setPaymentOpened(prev => !prev);

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
            setIsDataSent(true);
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
            {!isDataSent && (
                <>
                    <div className={styles.purchaseTitle}>
                        {t('purchaseReceiptOfGoods')}
                    </div>
                    <div className={styles.orderPurchaseWrapper}>
                        <Button
                            variant='outlined'
                            className={styles.orderPaymentWrapperButton}
                            color='primary'
                            onClick={handleChange}
                        >
                            {t('confirmPurchaseOrGetting')}
                        </Button>
                        <Collapse in={paymentOpened}>
                            <div className={styles.collapsedPayment}>
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

                                {isDataSending && (
                                    <div
                                        className={styles.purchaseLoaderWrapper}
                                    >
                                        <CircleLoader
                                            color={LoaderColors.PRIMARY}
                                        />
                                    </div>
                                )}
                            </div>
                        </Collapse>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderConfirmPurchase;
