import { Button, Collapse, Typography } from '@mui/material';
import cn from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoaderColors } from 'src/interfaces/loader';
import purchaseStyles from '../../../styles/drop-file-input.module.css';
import styles from '../../../styles/OrderPage.module.css';
import { ImageConfig } from '../drop-file-input/ImageConfig';
import CircleLoader from '../Loaders/CircleLoader';
import PurshasePhoto from './PurshasePhoto';

type IProps = {
    fileLinks?: string[];
};

const OrderReceiverPhotoConfirmation: React.FC<IProps> = ({ fileLinks }) => {
    const { t } = useTranslation();

    const [isReceiverDataBlockDisabled, setIsReceiverDataBlockDisabled] =
        useState<boolean>(false);
    const [paymentOpened, setPaymentOpened] = useState<boolean>(false);
    const [changedView, setChangedView] = useState<boolean>(false);

    const handleChange = () => setPaymentOpened(prev => !prev);

    const acceptData = () => {
        setIsReceiverDataBlockDisabled(true);
    };

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
                    <div className={styles.collapsxedPayment}>
                        <div>
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
                                                    >
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
                                                    {/* <PurshasePhoto /> */}
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

                        <Button
                            variant='contained'
                            onClick={acceptData}
                            disabled={isReceiverDataBlockDisabled}
                            className={styles.acceptPurchaseButton}
                            color='primary'
                        >
                            {t('approve')}
                        </Button>
                    </div>
                </Collapse>
            </div>
        </>
    );
};

export default OrderReceiverPhotoConfirmation;
