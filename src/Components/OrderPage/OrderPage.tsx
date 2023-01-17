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
import { Button } from '@mui/material';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';
import OrderPayment from './OrderPayment';

const useGetOrder = (orderId: string) => {
    const { triggerOpen } = useContext(OpenAlertContext);
    const [order, setOrder] = useState<IOrderFull | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { push } = useRouter();

    const updateOrder = async (withoutLoading?: true) => {
        if (!withoutLoading) {
            setIsLoading(true);
        }

        const data = await getOrderById({ orderId });

        if (data.ok && data.order) {
            setOrder(data.order);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to add an order',
            });

            push('/dashboard');
        }

        setIsLoading(false);
    };

    return { order, updateOrder, isLoading };
};

const OrderPage = () => {
    const router = useRouter();

    const { order, updateOrder, isLoading } = useGetOrder(
        router.query.orderId as string
    );

    useEffect(() => {
        updateOrder();
    }, []);

    if (isLoading || !order) {
        return <OrderLoader />;
    }

    return (
        <div className={styles.wrapper}>
            <OrderDetails order={order} />
            <OrderInformation order={order} updateOrder={updateOrder} />
            <OrderPayment order={order} />
            <div className={styles.haveSomeProblems}>
                <Link href='#'>Have some problems? Write to our support</Link>
            </div>
            <div className={styles.cancelButtonWrapper}>
                <Button
                    color='error'
                    variant='contained'
                    className={styles.cancelButton}
                >
                    Cancel order
                </Button>
            </div>
        </div>
    );
};

export default OrderPage;
