import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../../styles/OrderPage.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IOrder } from '../../interfaces/order';

type IProps = {
    order: IOrder;
};

const OrderDetails: React.FC<IProps> = ({ order }) => {
    const router = useRouter();

    return (
        <div className={styles.orderDetails}>
            <div className={styles.orderDetailsMain}>
                <div className={styles.orderDetailsTitle}>Order details</div>
                <div className={styles.orderStatus}>
                    Status: <span>{order.status}</span>
                </div>
            </div>
            <div className={styles.orderDetailsInfo}>
                <div className={styles.infoLeft}>
                    <p>Order ID:</p>
                    <p>Created time:</p>
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
