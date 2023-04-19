import React, { useContext } from 'react';
import styles from '../../../styles/OrderPage.module.css';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Collapse } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { confirmPayment } from 'src/api/order';
import { startPayment } from 'src/interfaces/api/payment';
import { OrderStatus } from 'src/interfaces/profile';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { selectUser } from 'src/redux/selectors/user';
import { IOrderFull } from '../../interfaces/order';
import { OpenAlertContext } from '../Layouts/Snackbar';

type IProps = {
    order: IOrderFull;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const PAYMENT_CREDENTIALS = {
    PHONE: '+79835454849',
    NAME: 'АРТЕМ ГАЗУКИН',
};

const OrderPayment: React.FC<IProps> = ({ order, updateOrder }) => {
    const formatAmount = useFormatAmount();
    const { id } = useSelector(selectUser);
    const { triggerOpen } = useContext(OpenAlertContext);
    const { asPath } = useRouter();

    const { t } = useTranslation();

    const userCurrency = useAppSelector(
        ({ settings }) => settings.generalSettings.currency
    );

    const startPaymentClick = async () => {
        console.log(order.paymentOrderId, window.location.origin + asPath);

        if (order.paymentOrderId) {
            await startPayment(
                order.paymentOrderId,
                window.location.origin + asPath
            );
        }
    };

    if (
        order.receiver?.id === id &&
        order.status === OrderStatus.waitingForPayment
    ) {
        return (
            <div className={styles.orderPaymentWrapper}>
                {order.totalPaymentAmount !== undefined && (
                    <div className={styles.orderPaymentWrapperTotalSum}>
                        {t('totalSum')}:&nbsp;
                        <span>
                            {formatAmount(
                                order.totalPaymentAmount,
                                userCurrency,
                                true
                            )}
                        </span>
                    </div>
                )}
                <Button
                    variant='outlined'
                    className={styles.orderPaymentWrapperButton}
                    color='success'
                    onClick={startPaymentClick}
                >
                    {t('pay')}
                </Button>
                {/* <Collapse in={paymentOpened}>
                    <div className={styles.collapsedPayment}>
                        <div className={styles.collapsedPaymentTitle}>
                            {t('transferTheAmountByPhoneNumberTo')}
                            &nbsp;
                            <b>{t('SBP')}</b> <br />
                            {t('banks')}: <b>{t('tinkoff')}</b>,{' '}
                            <b>{t('sberbank')}</b>
                        </div>
                        <div className={styles.name}>
                            {t('name')}: <b>{PAYMENT_CREDENTIALS.NAME}</b>
                        </div>
                        <div className={styles.phone} onClick={copy}>
                            {PAYMENT_CREDENTIALS.PHONE}
                            <ContentCopyIcon fontSize='small' />
                        </div>
                        <Button
                            variant='contained'
                            className={styles.orderConfirmPaymentButton}
                            color='primary'
                            onClick={confirmPaymentClick}
                        >
                            {t('confirmPay')}
                        </Button>
                    </div>
                </Collapse> */}
            </div>
        );
    }

    return null;
};

export default OrderPayment;
