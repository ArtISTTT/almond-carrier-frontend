import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../../styles/OrderPage.module.css';
import OrderDetails from './OrderDetails';
import OrderInformation from './OrderInformation';

const OrderPage = () => {
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <OrderDetails />
            <OrderInformation />
        </div>
    );
};

export default OrderPage;
