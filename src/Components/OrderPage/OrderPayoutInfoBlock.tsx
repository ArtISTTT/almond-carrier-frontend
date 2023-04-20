import { Button } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { startPayout } from 'src/api/payment';
import { IOrderFull } from 'src/interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { Banks } from 'src/interfaces/user';
import styles from '../../../styles/OrderPage.module.css';
import { ViewType } from './OrderInputItem';

interface IProps {
    order: IOrderFull;
    viewType: ViewType;
    status: OrderStatus;
}

const OrderPayoutInfoBlock: React.FC<IProps> = ({
    order,
    viewType,
    status,
}) => {
    const { t } = useTranslation();

    const onStartPayoutClick = async () => {
        if (order.payoutOrderId && order.sdRef) {
            await startPayout(order.payoutOrderId, order.sdRef);
        }
    };

    if (
        viewType === ViewType.carrier &&
        status === OrderStatus.awaitingPayout
    ) {
        return (
            <div className={styles.payoutWrapper}>
                <div className={styles.payoutTitle}>
                    {t('yourPayoutDetails')}
                </div>
                <Button
                    variant='contained'
                    type='submit'
                    onClick={onStartPayoutClick}
                >
                    Начать выплату
                </Button>
                {/* <div className={styles.payoutItems}>
                    <div className={styles.payoutItem}>
                        {' '}
                        {bank?.image && (
                            <Image
                                className={styles.payoutImage}
                                src={bank.image}
                                alt=''
                            />
                        )}
                        {bank?.text}
                    </div>
                    <div className={styles.payoutItem}>{phoneNumer}</div>
                </div> */}
            </div>
        );
    }

    return <></>;
};

export default OrderPayoutInfoBlock;
