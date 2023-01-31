import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from '../../../styles/OrderPage.module.css';
import OrderDetails from './OrderDetails';
import OrderInformation from './OrderInformation';
import { getOrderById } from '../../api/order';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { IOrderFull } from '../../interfaces/order';
import OrderLoader from '../OrderLoader';
import Link from 'next/link';
import { Button } from '@mui/material';
import OrderPayment from './OrderPayment';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/selectors/user';
import { ViewType } from './OrderInputItem';
import OrderLabels from './OrderLabels';
import OrderChat from '../Chat/OrderChat';
import { navigateTo } from 'src/interfaces/navigate';
import { useTranslation } from 'react-i18next';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';

const useGetOrder = (orderId: string) => {
    const { triggerOpen } = useContext(OpenAlertContext);
    const [order, setOrder] = useState<IOrderFull | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { push } = useRouter();
    const { t } = useTranslation();

    const updateOrder = async (withoutLoading?: true) => {
        if (!withoutLoading) {
            setIsLoading(true);
        }

        const data = await getOrderById({ orderId });

        if (data.ok && data.order) {
            setOrder(parseOrderDataFromApi([data.order])[0]);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorAddOrder'),
            });

            push(navigateTo.DASHBOARD);
        }

        setIsLoading(false);
    };

    return { order, updateOrder, isLoading };
};

const OrderPage = () => {
    const router = useRouter();
    const user = useSelector(selectUser);

    const { order, updateOrder, isLoading } = useGetOrder(
        router.query.orderId as string
    );

    const { t } = useTranslation();

    useEffect(() => {
        updateOrder();
    }, []);

    const viewType = useMemo(
        () =>
            order?.receiver?.id === user.id
                ? ViewType.receiver
                : ViewType.carrier,
        [order?.receiver?.id, user.id]
    );

    if (isLoading || !order) {
        return <OrderLoader />;
    }

    const suggestedChanged =
        viewType === ViewType.receiver
            ? order.byCarrierSuggestedChanges
            : order.byReceiverSuggestedChanges;
    const hasByYouSuggestedChanged = Boolean(
        viewType === ViewType.receiver
            ? order.byReceiverSuggestedChanges
            : order.byCarrierSuggestedChanges
    );

    return (
        <div className={styles.wrapper}>
            <OrderDetails order={order} />

            <OrderLabels
                order={order}
                viewType={viewType}
                suggestedChanged={suggestedChanged}
                hasByYouSuggestedChanged={hasByYouSuggestedChanged}
            />

            <div className={styles.orderConent}>
                <OrderInformation
                    order={order}
                    updateOrder={updateOrder}
                    user={user}
                    viewType={viewType}
                    suggestedChanged={suggestedChanged}
                    hasByYouSuggestedChanged={hasByYouSuggestedChanged}
                />
                <OrderChat
                    viewType={viewType}
                    order={order}
                    user={user}
                    updateOrder={updateOrder}
                />
            </div>

            <OrderPayment order={order} updateOrder={updateOrder} />
            <div className={styles.haveSomeProblems}>
                <Link href='#'>{t('HaveSomeProblems')}</Link>
            </div>
            <div className={styles.cancelButtonWrapper}>
                <Button
                    color='error'
                    variant='contained'
                    className={styles.cancelButton}
                >
                    {t('cancelOrder')}
                </Button>
            </div>
        </div>
    );
};

export default OrderPage;
