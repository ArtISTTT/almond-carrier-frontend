import React, { useContext } from 'react';
import styles from '../../../styles/OrderPage.module.css';

import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { startPayment } from 'src/api/payment';
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
    const user = useSelector(selectUser);

    const { t } = useTranslation();

    const userCurrency = useAppSelector(
        ({ settings }) => settings.generalSettings.currency
    );

    const startPaymentClick = async () => {
        if (order.paymentOrderId && order.sdRef) {
            await startPayment(order, user);
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
            </div>
        );
    }

    return null;
};

export default OrderPayment;
