import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../../styles/OrderPage.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const OrderInformation = () => {
    const router = useRouter();

    return (
        <div className={styles.orderInformation}>
            <div className={styles.orderInformationTitle}>
                Order information
            </div>
        </div>
    );
};

export default OrderInformation;
