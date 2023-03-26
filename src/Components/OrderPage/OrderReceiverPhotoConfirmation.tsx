import { Button, Collapse, Typography } from '@mui/material';
import cn from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import purchaseStyles from '../../../styles/drop-file-input.module.css';
import styles from '../../../styles/OrderPage.module.css';
import { ImageConfig } from '../drop-file-input/ImageConfig';

type IProps = {
    fileLinks?: string[];
};

const OrderReceiverPhotoConfirmation: React.FC<IProps> = ({ fileLinks }) => {
    const { t } = useTranslation();

    const [paymentOpened, setPaymentOpened] = useState<boolean>(false);
    const [changedView, setChangedView] = useState<boolean>(false);

    const handleChange = () => setPaymentOpened(prev => !prev);

    const acceptData = () => {};

    const changeView = () => {
        setChangedView(true);
    };

    return (
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
                    {t('purchaseInformation')}
                </Button>
                <Collapse in={paymentOpened}>
                    <div className={styles.collapsedPayment}>
                        <Typography
                            variant='h6'
                            component='h4'
                            className={styles.detailsBlock}
                        >
                            {t('checkTheReceiptAndTheProduct')}
                        </Typography>
                        <div className={styles.purchaseDataBlock}>
                            {fileLinks &&
                                fileLinks.map(link => {
                                    const linkFormat = link.split('.');

                                    if (
                                        linkFormat[linkFormat.length - 1] !==
                                        'pdf'
                                    ) {
                                        return (
                                            <div>
                                                <img
                                                    onClick={changeView}
                                                    className={cn(
                                                        styles.purchasePhoto,
                                                        {
                                                            [styles.purchaseZoomPhoto]:
                                                                changedView,
                                                        }
                                                    )}
                                                    src={link}
                                                />
                                            </div>
                                        );
                                    }

                                    return '';
                                })}
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
                                                        <p>File</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }

                                    return '';
                                })}
                        </div>
                        <Button
                            variant='contained'
                            onClick={acceptData}
                            className={styles.acceptPurchaseButton}
                            color='primary'
                        >
                            {t('confirmPurchase')}
                        </Button>
                    </div>
                </Collapse>
            </div>
        </>
    );
};

export default OrderReceiverPhotoConfirmation;
