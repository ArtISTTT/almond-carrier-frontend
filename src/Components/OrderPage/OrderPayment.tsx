import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/OrderPage.module.css';
import OrderDetails from './OrderDetails';
import OrderInformation from './OrderInformation';
import { getOrderById } from '../../api/order';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { IOrder, IOrderFull } from '../../interfaces/order';
import OrderLoader from '../OrderLoader';
import Link from 'next/link';
import { Button, Collapse } from '@mui/material';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';
import { calculateTotalAmount } from 'src/helpers/calculateTotalAmount';
import { Currency } from 'src/interfaces/settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type IProps = {
    order: IOrderFull;
};

const PAYMENT_CREDENTIALS = {
    PHONE: '+79835454849',
    NAME: 'АРТЕМ ГАЗУКИН',
};

const OrderPayment: React.FC<IProps> = ({ order }) => {
    const [paymentOpened, setPaymentOpened] = useState(false);
    const { triggerOpen } = useContext(OpenAlertContext);

    const handleChange = () => {
        setPaymentOpened(prev => !prev);
    };

    const copy = () => {
        navigator.clipboard.writeText(PAYMENT_CREDENTIALS.PHONE);
        triggerOpen({
            severity: 'info',
            text: 'Copied',
        });
    };

    return (
        <div className={styles.orderPaymentWrapper}>
            <div className={styles.orderPaymentWrapperTotalSum}>
                Total sum to be paid:&nbsp;
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
                Оплатить
            </Button>
            <Collapse in={paymentOpened}>
                <div className={styles.collapsedPayment}>
                    <div className={styles.collapsedPaymentTitle}>
                        Переведите сумму по номеру телефона на <b>СБП</b> <br />
                        Банки: <b>Тинькофф</b>, <b>Сбербанк</b>
                    </div>
                    <div className={styles.name}>
                        Имя: <b>{PAYMENT_CREDENTIALS.NAME}</b>
                    </div>
                    <div className={styles.phone} onClick={copy}>
                        {PAYMENT_CREDENTIALS.PHONE}
                        <ContentCopyIcon fontSize='small' />
                    </div>
                    <Button
                        variant='contained'
                        className={styles.orderConfirmPaymentButton}
                        color='primary'
                        onClick={handleChange}
                    >
                        Подтвердить оплату
                    </Button>
                </div>
            </Collapse>
        </div>
    );
};

export default OrderPayment;
