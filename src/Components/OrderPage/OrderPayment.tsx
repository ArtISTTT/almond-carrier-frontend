import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/OrderPage.module.css';
import OrderDetails from './OrderDetails';
import OrderInformation from './OrderInformation';
import { confirmPayment, getOrderById } from '../../api/order';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { IOrder, IOrderFull } from '../../interfaces/order';
import OrderLoader from '../OrderLoader';
import Link from 'next/link';
import { Button, Collapse } from '@mui/material';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';
import { calculateTotalAmount } from 'src/helpers/calculateTotalAmount';
import { Currency } from 'src/interfaces/settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/selectors/user';
import { OrderStatus } from 'src/interfaces/profile';
import { useTranslation } from 'react-i18next';

type IProps = {
    order: IOrderFull;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const PAYMENT_CREDENTIALS = {
    PHONE: '+79835454849',
    NAME: 'АРТЕМ ГАЗУКИН',
};

const OrderPayment: React.FC<IProps> = ({ order, updateOrder }) => {
    const [paymentOpened, setPaymentOpened] = useState(false);
    const { id } = useSelector(selectUser);
    const { triggerOpen } = useContext(OpenAlertContext);

    const { t } = useTranslation();

    const handleChange = () => {
        setPaymentOpened(prev => !prev);
    };

    const copy = () => {
        navigator.clipboard.writeText(PAYMENT_CREDENTIALS.PHONE);
        triggerOpen({
            severity: 'info',
            text: t('copied'),
        });
    };

    const confirmPaymentClick = async () => {
        const data = await confirmPayment({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('paymentConfirmedAlert'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error as string,
            });
        }

        await updateOrder(true);
    };

    if (
        order.receiver?.id === id &&
        order.status === OrderStatus.waitingForPayment
    ) {
        return (
            <div className={styles.orderPaymentWrapper}>
                <div className={styles.orderPaymentWrapperTotalSum}>
                    {t('totalSum')}:&nbsp;
                    <span>
                        {calculateTotalAmount(
                            order.productAmount as number,
                            order.rewardAmount,
                            Currency.RUB
                        )}
                    </span>
                </div>
                <Button
                    variant='outlined'
                    className={styles.orderPaymentWrapperButton}
                    color='primary'
                    onClick={handleChange}
                >
                    {t('pay')}
                </Button>
                <Collapse in={paymentOpened}>
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
                </Collapse>
            </div>
        );
    }

    return null;
};

export default OrderPayment;
