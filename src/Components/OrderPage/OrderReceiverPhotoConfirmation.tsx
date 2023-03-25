import { Button, Collapse, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/OrderPage.module.css';

const links = [
    '/static/images/main-page/receiving.png',
    '/static/images/main-page/receiving.png',
    '/static/images/main-page/receiving.png',
];

const OrderReceiverPhotoConfirmation = () => {
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
                            {links.map(link => (
                                <div>
                                    <img
                                        onClick={changeView}
                                        className={cn(styles.purchasePhoto, {
                                            [styles.purchaseZoomPhoto]:
                                                changedView,
                                        })}
                                        src={link}
                                    />
                                </div>
                            ))}
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
