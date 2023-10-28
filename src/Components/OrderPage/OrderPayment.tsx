import { Button } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { OrderStatus } from 'src/interfaces/profile';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { selectUser } from 'src/redux/selectors/user';
import styles from '../../../styles/OrderPage.module.css';
import { IOrderFull } from '../../interfaces/order';
import { ViewType } from './OrderInputItem';

type IProps = {
    order: IOrderFull;
    viewType: ViewType;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const OrderPayment: React.FC<IProps> = ({ order, viewType, updateOrder }) => {
    dayjs.extend(duration);
    const formatAmount = useFormatAmount();
    const { id } = useSelector(selectUser);

    const { t } = useTranslation();

    const [paymentTime, setPaymentTime] = useState('');

    const userCurrency = useAppSelector(
        ({ settings }) => settings.generalSettings.currency
    );

    const startPaymentClick = async () => {
        if (order.paymentUrl) {
            window.open(order.paymentUrl, '_blank')?.focus();
        }
    };

    useEffect(() => {
        const timer = setInterval(async () => {
            const start = dayjs();
            const end = dayjs(order.paymentExpire);

            const difference = end.diff(start);

            const diffDuration = dayjs.duration(difference);

            const hours = diffDuration.hours().toString().padStart(2, '0');
            const minutes = diffDuration.minutes().toString().padStart(2, '0');
            const seconds = diffDuration.seconds().toString().padStart(2, '0');

            if (diffDuration.asSeconds() <= 0) {
                updateOrder(true);
            }

            setPaymentTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [setPaymentTime]);

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
                {order.status === OrderStatus.waitingForPayment &&
                    viewType === ViewType.receiver && (
                        <div className={styles.paymentTimerWrapper}>
                            {t('payDuring', { paymentTime })}
                        </div>
                    )}
            </div>
        );
    }

    return null;
};

export default OrderPayment;
