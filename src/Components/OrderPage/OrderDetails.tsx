import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../../styles/OrderPage.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';
import { IOrder } from '../../interfaces/order';

type IProps = {
    order: IOrder;
};

const OrderDetails: React.FC<IProps> = ({ order }) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className={styles.orderDetails}>
            <div className={styles.orderDetailsMain}>
                <div className={styles.orderDetailsTitle}>
                    {t('orderDetails')}
                </div>
                <div className={styles.orderStatus}>
                    {t('status:')} <span>Looking for carrier</span>
                </div>
            </div>
            <div className={styles.orderDetailsInfo}>
                <div className={styles.infoLeft}>
                    <p>{t('orderID')}:</p>
                    <p>{t('createdTime')}:</p>
                </div>
                <div className={styles.infoRight}>
                    <div className={styles.infoRightId}>
                        <span>{order.id}</span>
                        <div>
                            <ContentCopyIcon fontSize='small' />
                        </div>
                    </div>
                    <div>10.12.2024 13:43:12</div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
