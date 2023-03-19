import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Button, Link as MUILink } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';
import { LoaderColors } from 'src/interfaces/loader';
import { navigateTo } from 'src/interfaces/navigate';
import { OrderStatus } from 'src/interfaces/profile';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/selectors/user';
import styles from '../../../styles/OrderPage.module.css';
import { cancelOrder, declineOrder, getOrderById } from '../../api/order';
import { IOrderFull } from '../../interfaces/order';
import OrderChat from '../Chat/OrderChat';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import { OpenDialogContext } from '../Layouts/ConfirmDialog';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CircleLoader from '../Loaders/CircleLoader';
import OrderDetails from './OrderDetails';
import OrderInformation from './OrderInformation';
import { ViewType } from './OrderInputItem';
import OrderLabels from './OrderLabels';
import OrderPayment from './OrderPayment';
import OrderPaymentSuccess from './OrderPaymentSuccess';

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
            setOrder((await parseOrderDataFromApi([data.order]))[0]);
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
    const payoutRef = React.useRef<null | HTMLDivElement>(null);
    const { triggerDialogOpen } = useContext(OpenDialogContext);
    const user = useSelector(selectUser);

    const [isReviewBlockOpen, setIsReviewBlockOpen] = useState<boolean>(false);
    const [isPersonReviewBlockOpen, setIsPersonReviewBlockOpen] =
        useState<boolean>(false);
    const [isMySentReviewBlockOpen, setIsMySentReviewBlockOpen] =
        useState<boolean>(false);

    const { order, updateOrder, isLoading } = useGetOrder(
        router.query.orderId as string
    );

    const { t } = useTranslation();

    useEffect(() => {
        updateOrder();
    }, []);

    useEffect(() => {
        if (
            order?.status &&
            [
                OrderStatus.itemRecieved,
                OrderStatus.awaitingPayout,
                OrderStatus.success,
            ].includes(order.status)
        ) {
            setIsReviewBlockOpen(true);
        }
    }, [order]);

    const viewType = useMemo(
        () =>
            order?.receiver?.id === user.id
                ? ViewType.receiver
                : ViewType.carrier,
        [order?.receiver?.id, user.id]
    );

    if (isLoading || !order) {
        return (
            <div className={styles.loaderWrapper}>
                <CircleLoader color={LoaderColors.PRIMARY} />
            </div>
        );
    }

    const cancelOrderClick = () => {
        triggerDialogOpen({
            text: 'doYouReallyWantToCancelOrder?',
            completeCallBack: async () =>
                await cancelOrder({ orderId: order.id }),
        });
    };

    const declineCLick = () => {
        triggerDialogOpen({
            text:
                order.creatorId === user.id
                    ? t('doYouReallyWantToDeclinePartner?')
                    : t('doYouReallyWantToDeclineOrder?'),
            completeCallBack: async () => {
                const data = await declineOrder({ orderId: order.id });
                if (data.ok) {
                    router.push(navigateTo.DASHBOARD);
                }
            },
        });
    };

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
            <OrderDetails
                payoutRef={payoutRef}
                setIsMySentReviewBlockOpen={setIsMySentReviewBlockOpen}
                setIsPersonReviewBlockOpen={setIsPersonReviewBlockOpen}
                setIsReviewBlockOpen={setIsReviewBlockOpen}
                order={order}
                viewType={viewType}
            />

            <OrderLabels
                order={order}
                viewType={viewType}
                suggestedChanged={suggestedChanged}
                hasByYouSuggestedChanged={hasByYouSuggestedChanged}
            />

            <div className={styles.orderConent}>
                <OrderInformation
                    isMySentReviewBlockOpen={isMySentReviewBlockOpen}
                    isPersonReviewBlockOpen={isPersonReviewBlockOpen}
                    isReviewBlockOpen={isReviewBlockOpen}
                    setIsReviewBlockOpen={setIsReviewBlockOpen}
                    setIsMySentReviewBlockOpen={setIsMySentReviewBlockOpen}
                    setIsPersonReviewBlockOpen={setIsPersonReviewBlockOpen}
                    order={order}
                    updateOrder={updateOrder}
                    user={user}
                    viewType={viewType}
                    suggestedChanged={suggestedChanged}
                    hasByYouSuggestedChanged={hasByYouSuggestedChanged}
                />
                {((viewType === ViewType.carrier && order.receiver) ||
                    (viewType === ViewType.receiver && order.carrier)) && (
                    <OrderChat
                        viewType={viewType}
                        order={order}
                        user={user}
                        updateOrder={updateOrder}
                    />
                )}
            </div>

            <div ref={payoutRef}>
                <OrderPayment order={order} updateOrder={updateOrder} />
            </div>

            {order.status === OrderStatus.itemRecieved &&
                viewType === ViewType.carrier && (
                    <OrderPaymentSuccess order={order} />
                )}

            <div className={styles.haveSomeProblems}>
                <SupportAgentIcon />
                <MUILink
                    component={LinkBehaviour}
                    href='mailto:support@friendlycarrier.com'
                >
                    {t('haveSomeProblems')}
                </MUILink>
            </div>
            <div className={styles.cancelButtons}>
                {[OrderStatus.inDiscussion].includes(order.status) && (
                    <div className={styles.cancelButtonWrapper}>
                        <Button
                            onClick={declineCLick}
                            color='error'
                            variant='contained'
                            className={styles.cancelButton}
                        >
                            {order.creatorId === user.id
                                ? t('declinePartner')
                                : t('declineOrder')}
                        </Button>
                    </div>
                )}
                {order.creatorId === user.id &&
                    [
                        OrderStatus.waitingReciever,
                        OrderStatus.waitingCarrier,
                        OrderStatus.inDiscussion,
                    ].includes(order.status) && (
                        <div className={styles.cancelButtonWrapper}>
                            <Button
                                onClick={cancelOrderClick}
                                color='error'
                                variant='contained'
                                className={styles.cancelButton}
                            >
                                {t('cancelOrder')}
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default OrderPage;
