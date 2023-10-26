import React from 'react';
import styles from '../../../styles/OrderPage.module.css';

import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { OrderStatus } from 'src/interfaces/profile';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { selectUser } from 'src/redux/selectors/user';
import { IOrderFull } from '../../interfaces/order';

type IProps = {
    order: IOrderFull;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const OrderPayment: React.FC<IProps> = ({ order }) => {
    const formatAmount = useFormatAmount();
    const { id } = useSelector(selectUser);

    const { t } = useTranslation();

    const userCurrency = useAppSelector(
        ({ settings }) => settings.generalSettings.currency
    );

    const startPaymentClick = async () => {
        if (order.paymentUrl) {
            window.open(order.paymentUrl, '_blank')?.focus();
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
