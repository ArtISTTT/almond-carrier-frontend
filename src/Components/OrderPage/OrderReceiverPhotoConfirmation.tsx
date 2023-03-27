import { Button, Collapse, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { acceptReceiverPurchaseData } from 'src/api/order';
import { LoaderColors } from 'src/interfaces/loader';
import { OrderStatus } from 'src/interfaces/profile';
import purchaseStyles from '../../../styles/drop-file-input.module.css';
import styles from '../../../styles/OrderPage.module.css';
import { ImageConfig } from '../drop-file-input/ImageConfig';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CircleLoader from '../Loaders/CircleLoader';
import { ViewType } from './OrderInputItem';
import PurshasePhoto from './PurshasePhoto';

type IProps = {
    fileLinks?: string[];
    orderId: string;
    viewType: ViewType;
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
    viewType,
    orderStatus,
    orderId,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const [isReceiverDataBlockDisabled, setIsReceiverDataBlockDisabled] =
        useState<boolean>(false);
    const [paymentOpened, setPaymentOpened] = useState<boolean>(false);
    const [openedPhoto, setOpenedPhoto] = useState<string | undefined>(
        undefined
    );

    const handleChange = () => setPaymentOpened(prev => !prev);

    const acceptData = async () => {
        setIsReceiverDataBlockDisabled(true);

        const data = await acceptReceiverPurchaseData({ orderId });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('dataConfirmed'),
            });
            setIsReceiverDataBlockDisabled(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: t('dataConfirmedError'),
            });
            setIsReceiverDataBlockDisabled(false);
        }
    };

    const changeView = (link: string) => {
        setOpenedPhoto(link);
    };

    return (
        <>
            {viewType === ViewType.receiver &&
                orderStatus ===
                    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation && (
                    <div className={styles.purchaseTitle}>
                        {t('purchaseReceiptOfGoods')}
                    </div>
                )}
            <div className={styles.orderPurchaseWrapper}>
                <Button
                    variant='outlined'
                    className={styles.orderPaymentWrapperButton}
                    color='primary'
                    onClick={handleChange}
                >
                    {t('purchaseInformation')}
                </Button>
                <Collapse in={paymentOpened}>
                    <div className={styles.collapsedPayment}>
                        <div>
                            {viewType === ViewType.receiver &&
                            !allowedStatusesForPurchaseButtons.includes(
                                orderStatus
                            ) ? (
                                <Typography
                                    variant='h6'
                                    component='h4'
                                    className={styles.detailsBlock}
                                >
                                    {t('checkTheReceiptAndTheProduct')}
                                </Typography>
                            ) : (
                                <Typography
                                    variant='h6'
                                    component='h4'
                                    className={styles.detailsBlock}
                                >
                                    {t('purchaseInformation')}
                                </Typography>
                            )}
                            <div className={styles.purchaseDataBlock}>
                                {fileLinks &&
                                    fileLinks.map(link => {
                                        const linkFormat = link.split('.');

                                        if (
                                            linkFormat[
                                                linkFormat.length - 1
                                            ] !== 'pdf'
                                        ) {
                                            return (
                                                <>
                                                    <div
                                                        className={
                                                            styles.purchasePhotoBlock
                                                        }
                                                        onClick={() =>
                                                            changeView(link)
                                                        }
                                                    >
                                                        <img
                                                            className={
                                                                styles.purchasePhoto
                                                            }
                                                            src={link}
                                                        />
                                                    </div>
                                                    {openedPhoto && (
                                                        <PurshasePhoto
                                                            setOpenedPhoto={
                                                                setOpenedPhoto
                                                            }
                                                            openedPhoto={
                                                                openedPhoto
                                                            }
                                                        />
                                                    )}
                                                </>
                                            );
                                        }

                                        return '';
                                    })}
                            </div>

                            {fileLinks &&
                                fileLinks.map(link => {
                                    const linkFormat = link.split('.');

                                    if (
                                        linkFormat[linkFormat.length - 1] ===
                                        'pdf'
                                    ) {
                                        return (
                                            <Link target='_blank' href={link}>
                                                <div
                                                    key={link}
                                                    className={
                                                        purchaseStyles.dropFilePreviewItem
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            ImageConfig['pdf']
                                                                .src
                                                        }
                                                        alt=''
                                                    />
                                                    <div
                                                        className={
                                                            purchaseStyles.dropFilePreviewItemInfo
                                                        }
                                                    >
                                                        <p>{t('file')}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }

                                    return '';
                                })}
                        </div>
                        {isReceiverDataBlockDisabled && (
                            <div className={styles.purchaseLoaderWrapper}>
                                <CircleLoader color={LoaderColors.PRIMARY} />
                            </div>
                        )}

                        {viewType === ViewType.receiver &&
                            !allowedStatusesForPurchaseButtons.includes(
                                orderStatus
                            ) && (
                                <Button
                                    variant='contained'
                                    onClick={acceptData}
                                    disabled={isReceiverDataBlockDisabled}
                                    className={styles.acceptPurchaseButton}
                                    color='primary'
                                >
                                    {t('approve')}
                                </Button>
                            )}
                    </div>
                </Collapse>
            </div>
        </>
    );
};

export default OrderReceiverPhotoConfirmation;
